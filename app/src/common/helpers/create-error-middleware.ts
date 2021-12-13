import { Response, Request } from 'express';
import { logger } from '../../config';

interface ICreateErrorMiddlewareProps {
  message: string;
  statusCode: number;
}

export const createErrorMiddleware =
  ({ message, statusCode }: ICreateErrorMiddlewareProps) =>
  (req: Request, res: Response) => {
    logger.error(
      `${statusCode} - ${req.originalUrl} - ${req.method} - message: ${message}`
    );
    res.status(statusCode);
    res.json({
      message,
    });
  };
