import { createValidator } from 'express-joi-validation';
import { groupQueryParamsValidationSchema } from '../validation-schema';

export const groupQueryParamsValidator = createValidator().query(
  groupQueryParamsValidationSchema
);
