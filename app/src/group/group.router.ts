import { Router } from 'express';
import * as groupController from './group.controller';
import {
  ID,
  createErrorMiddleware,
  StatusCode,
  ErrorMessage,
  DefaultMiddleware,
} from '../common';
import * as Validator from '../validators';
import {
  groupBodyValidator,
  groupQueryParamsValidator,
  addUsersToGroupBodyValidator,
} from '../validators';

const groupRouter = Router();

groupRouter.get(
  '/',
  groupQueryParamsValidator,
  groupController.getGroups as DefaultMiddleware
);

groupRouter.get(`/:${ID}`, groupController.getGroupByID);

groupRouter.post('/', groupBodyValidator, groupController.createGroup);

groupRouter.put(
  `/:${ID}`,
  Validator.isExistingGroupID(
    createErrorMiddleware({
      message: ErrorMessage.GROUP_DOESNT_EXISTS,
      statusCode: StatusCode.BAD_REQUEST,
    })
  ),
  groupBodyValidator,
  groupController.updateGroup
);

groupRouter.delete(
  `/:${ID}`,
  Validator.isExistingGroupID(
    createErrorMiddleware({
      message: ErrorMessage.GROUP_DOESNT_EXISTS,
      statusCode: StatusCode.NOT_FOUND,
    })
  ),
  groupController.deleteGroup
);

groupRouter.post(
  `/:${ID}/addUsers`,
  addUsersToGroupBodyValidator,
  Validator.isExistingGroupID(
    createErrorMiddleware({
      message: ErrorMessage.GROUP_DOESNT_EXISTS,
      statusCode: StatusCode.NOT_FOUND,
    })
  ),
  groupController.addUsersToGroup
);

export default groupRouter;
