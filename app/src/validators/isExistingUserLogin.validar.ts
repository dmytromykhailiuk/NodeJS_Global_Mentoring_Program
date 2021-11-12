import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import { UserDTO } from '../dto';

export const isExistingUserLogin =
  (errorCallback: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request<{}, {}, UserDTO>, res: Response, next: NextFunction) =>
    userService.isExistingLogin(req.body.login)
      ? errorCallback(req, res, next)
      : next();
