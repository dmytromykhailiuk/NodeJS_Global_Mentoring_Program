import { createValidator } from 'express-joi-validation';
import { userBodyValidationSchema } from '../validation-schema';

export const userBodyValidator = createValidator().body(
  userBodyValidationSchema
);
