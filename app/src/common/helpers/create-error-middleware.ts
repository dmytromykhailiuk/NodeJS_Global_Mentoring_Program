import { Response, Request } from 'express';

interface ICreateErrorMiddlewareProps {
  message: string;
  statusCode: number;
}

export const createErrorMiddleware =
  ({ message, statusCode }: ICreateErrorMiddlewareProps) =>
  (_: Request, res: Response) => {
    res.status(statusCode);
    res.json({
      message,
    });
  };
