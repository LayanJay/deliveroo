import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../logger';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) {
      logger.error(`[403] Error  ${err.message}`);
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  });
};
