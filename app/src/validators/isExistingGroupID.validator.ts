import { Request, Response, NextFunction } from 'express';
import { ID } from '../common';
import { groupService } from '../services';

export const isExistingGroupID =
  (errorCallback: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request<{ [ID]: string }>, res: Response, next: NextFunction) => {
    const isExistingUserID = await groupService.isExistingID(req.params.id);
    if (isExistingUserID) {
      next();
    } else {
      errorCallback(req, res, next);
    }
  };
