import axios from 'axios';
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { LoginFormValues, RegisterFormValues } from '../definitions/interfaces/form-values';

interface AuthenticationStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signInWithEmail: (args: LoginFormValues) => Promise<void>;
  signUpWithEmail: (args: RegisterFormValues) => Promise<void>;
  signOut: () => Promise<void>;
  getGoogleOAuthURL: () => string;
  checkCurrentAccessToken: () => boolean;
}

const accessTokenCookieOptions: Cookies.CookieAttributes = {
  expires: 108000000,
  path: '/',
};

const refreshTokenCookieOptions: Cookies.CookieAttributes = {
  ...accessTokenCookieOptions,
  expires: 2592000000,
};

export const useAuthenticationStore = create<AuthenticationStore>((set) => ({
  isAuthenticated: Cookies.get('accessToken') ? true : false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  signInWithEmail: async (args: LoginFormValues) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        { ...args },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        Cookies.set('accessToken', response.data.accessToken, accessTokenCookieOptions);
        Cookies.set('refreshToken', response.data.refreshToken, refreshTokenCookieOptions);
        set({ isAuthenticated: true });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message === 'User not found') {
        throw new Error('User not found');
      }
      throw new Error('Error signing in');
    }
  },
  signUpWithEmail: async (args: RegisterFormValues) => {
    console.log('🚀 ~ file: authentication-store.ts:45 ~ signUpWithEmail: ~ args:', args);
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/register',
        { ...args },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        Cookies.set('accessToken', response.data.accessToken, accessTokenCookieOptions);
        Cookies.set('refreshToken', response.data.refreshToken, refreshTokenCookieOptions);
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error signing up');
    }
  },
  signOut: async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/logout',
        { token: Cookies.get('refreshToken') },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        set({ isAuthenticated: false });
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error signing out');
    }
  },
  getGoogleOAuthURL: () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL as string,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  },
  checkCurrentAccessToken: () => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      set({ isAuthenticated: false });
      return false;
    }
    set({ isAuthenticated: true });
    return true;
  },
}));
