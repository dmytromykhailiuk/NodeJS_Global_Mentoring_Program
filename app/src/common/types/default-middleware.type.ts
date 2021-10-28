import { Request, Response, NextFunction } from 'express';

export type DefaultMiddleware = (
  req: unknown | Request,
  res: Response,
  next: NextFunction
) => void;
