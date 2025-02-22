//auth.ts
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';

config();

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'No authorization header found'
      });
      return;
    }
  
  
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Invalid token format',
        message: 'Authorization header must start with "Bearer"'
      });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      res.status(401).json({
        error: 'Invalid token',
        message: 'Token not provided'
      });
      return;
    }
  
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as jwt.JwtPayload;
      
      next();
    } catch(error) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  };