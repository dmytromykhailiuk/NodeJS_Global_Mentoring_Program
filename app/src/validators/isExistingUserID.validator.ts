import { Request, Response, NextFunction } from 'express';
import { ID } from '../common';
import userService from '../services/user.service';

export const isExistingUserID =
  (errorCallback: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request<{ [ID]: string }>, res: Response, next: NextFunction) =>
    !userService.isExistingID(req.params.id)
      ? errorCallback(req, res, next)
      : next();
