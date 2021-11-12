import * as Joi from 'joi';
import { UserDTOFields } from '../common/enums';

export const userBodyValidationSchema = Joi.object({
  [UserDTOFields.LOGIN]: Joi.string().min(3).required(),
  [UserDTOFields.PASSWORD]: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/)
    .message(
      `Error validating request body. ${UserDTOFields.PASSWORD} must contain letters and numbers.`
    )
    .required(),
  [UserDTOFields.AGE]: Joi.number().integer().less(130).greater(4).required(),
});
