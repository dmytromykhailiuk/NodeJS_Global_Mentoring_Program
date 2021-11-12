import * as Joi from 'joi';
import { QueryParamsForGetUserRequest } from '../common';

export const userQueryParamsValidationSchema = Joi.object({
  [QueryParamsForGetUserRequest.LIMIT]: Joi.number().integer(),
  [QueryParamsForGetUserRequest.LOGIN_SUBSTRING]: Joi.string().empty(''),
});
