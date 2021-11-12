import { createValidator } from 'express-joi-validation';
import { userQueryParamsValidationSchema } from '../validation-schema';

export const userQueryParamsValidator = createValidator().query(
  userQueryParamsValidationSchema
);
