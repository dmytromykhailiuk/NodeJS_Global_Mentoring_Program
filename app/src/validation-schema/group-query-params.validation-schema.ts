import * as Joi from 'joi';
import { QueryParamsForGetGroupRequest } from '../common';

export const groupQueryParamsValidationSchema = Joi.object({
  [QueryParamsForGetGroupRequest.LIMIT]: Joi.number().integer(),
  [QueryParamsForGetGroupRequest.NAME_SUBSTRING]: Joi.string().empty(''),
});
