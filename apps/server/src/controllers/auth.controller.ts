import axios from 'axios';
import bcrypt from 'bcrypt';
import { CookieOptions, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../models';
import logger from '../logger';
import { loginValidator, registerValidator } from '../validators/auth.validator';

enum AuthProvider {
  GOOGLE = 'google',
  LOCAL = 'local',
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 1800000, // 30 mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export class AuthController {
  // NOTE: This is not a secure way to store refresh tokens. This is just for demo purposes.
  public static refreshTokens: string[] = [];
  public static async login(req: Request, res: Response) {
    try {
      const isValid = loginValidator(req.body);
      if (!isValid) {
        logger.error('[400] Invalid login');
        return res.status(400).json({ message: 'Invalid login' });
      }
      const user = await db.User.findByPk(req.body.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Check if password matches
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      logger.info('[200] Successfully logged in');
      const accessToken = AuthController.generateAccessToken({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      const refreshToken = AuthController.generateRefreshToken({ email: user.email });
      AuthController.refreshTokens.push(refreshToken);
      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

      return res.redirect(process.env.CLIENT_URL as string);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async register(req: Request, res: Response) {
    try {
      const isValid = registerValidator(req.body);
      if (!isValid) {
        logger.error('[400] Invalid signup');
        return res.status(400).json({ message: 'Invalid signup' });
      }
      // Hashing the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      logger.info('[201] Successfully registered');
      // Create a new user
      await db.User.create({ ...req.body, password: hashedPassword, provider: AuthProvider.LOCAL });
      // Login the newly created user
      return AuthController.login(req, res);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async logout(req: Request, res: Response) {
    try {
      logger.info('[200] Successfully logged out');
      AuthController.refreshTokens = AuthController.refreshTokens.filter(
        (token) => token !== req.body.token
      );
      return res.status(200).json({ message: 'Successfully logged out' });
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async token(req: Request, res: Response) {
    try {
      if (!req.body.token) {
        logger.error('[400] Missing token');
        return res.status(400).json({ message: 'Missing token' });
      }
      if (!AuthController.refreshTokens.includes(req.body.token)) {
        logger.error('[400] Invalid token');
        return res.status(400).json({ message: 'Invalid token' });
      }

      // Checking if the refresh token is valid
      jwt.verify(
        req.body.token,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: any, parsedUser: any) => {
          if (err) {
            logger.error('[403] Forbidden');
            return res.status(403).json({ message: 'Forbidden' });
          }
          // Checking if the user exists in the database
          const user = await db.User.findByPk(parsedUser.email);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          logger.info('[200] Successfully refreshed token');
          const accessToken = AuthController.generateAccessToken({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          });
          return res.status(200).json({ accessToken: accessToken });
        }
      );
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static async googleOAuth(req: Request, res: Response) {
    const code = req.query.code as string;
    try {
      // Get the access token and the id token
      const { access_token, id_token } = await AuthController.getGoogleOAuthTokens(code);

      // Get user with tokens
      const googleUser = await AuthController.getGoogleUser(access_token, id_token);

      if (!googleUser.verified_email) {
        return res.status(403).send('Google account is not verified');
      }

      const [user, created] = await db.User.findOrCreate({
        where: { email: googleUser.email },
        defaults: {
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          email: googleUser.email,
          provider: AuthProvider.GOOGLE,
        },
      });

      const accessToken = AuthController.generateAccessToken({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      const refreshToken = AuthController.generateRefreshToken({ email: user.email });
      AuthController.refreshTokens.push(refreshToken);
      // set cookies
      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

      return res.redirect(process.env.CLIENT_URL as string);
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      return res.status(500).json({ message: 'Error ' + JSON.stringify(error) });
    }
  }

  public static generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' });
  }

  static generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
  }

  static async getGoogleOAuthTokens(code: string): Promise<GoogleTokensResult> {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://localhost:4000/auth/google',
      grant_type: 'authorization_code',
    };

    try {
      const res = await axios.post<GoogleTokensResult>(url, values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return res.data;
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      throw new Error(error.message);
    }
  }

  static async getGoogleUser(access_token: string, id_token: string): Promise<GoogleUserResult> {
    try {
      const res = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      logger.error(`[500] Error  ${error.message}`);
      throw new Error(error.message);
    }
  }
}
