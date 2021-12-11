import { createValidator } from 'express-joi-validation';
import {
  groupBodyValidationSchema,
  addUsersToGroupBodyValidationSchema,
} from '../validation-schema';

export const groupBodyValidator = createValidator().body(
  groupBodyValidationSchema
);

export const addUsersToGroupBodyValidator = createValidator().body(
  addUsersToGroupBodyValidationSchema
);
