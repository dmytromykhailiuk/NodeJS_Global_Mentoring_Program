import { Request, Response, NextFunction } from 'express';
import { ID } from '../common';
import userService from '../services/user.service';

export const isExistingUserID =
  (errorCallback: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request<{ [ID]: string }>, res: Response, next: NextFunction) => {
    const isExistingUserID = await userService.isExistingID(req.params.id);
    console.log(isExistingUserID);
    if (isExistingUserID) {
      next();
    } else {
      errorCallback(req, res, next);
    }
  };
