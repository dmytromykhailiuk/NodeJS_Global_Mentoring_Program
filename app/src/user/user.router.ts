import { Router } from 'express';
import * as userController from './user.controller';
import {
  ID,
  createErrorMiddleware,
  StatusCode,
  ErrorMessage,
  DefaultMiddleware,
} from '../common';
import * as Validator from '../validators';
import { userBodyValidator, userQueryParamsValidator } from '../validators';

const userRouter = Router();

userRouter.get(
  '/',
  userQueryParamsValidator,
  userController.getUsers as DefaultMiddleware
);

userRouter.get(`/:${ID}`, userController.getUserByID);

userRouter.post('/', userBodyValidator, userController.createUser);

userRouter.put(
  `/:${ID}`,
  Validator.isExistingUserID(
    createErrorMiddleware({
      message: ErrorMessage.USER_DOESNT_EXISTS,
      statusCode: StatusCode.BAD_REQUEST,
    })
  ),
  userBodyValidator,
  userController.updateUser
);

userRouter.delete(
  `/:${ID}`,
  Validator.isExistingUserID(
    createErrorMiddleware({
      message: ErrorMessage.USER_DOESNT_EXISTS,
      statusCode: StatusCode.NOT_FOUND,
    })
  ),
  userController.deleteUser
);

export default userRouter;
