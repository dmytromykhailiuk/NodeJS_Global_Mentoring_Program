import * as Joi from 'joi';
import { Permissions } from '../common';

export const groupBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  permissions: Joi.array()
    .items(
      Joi.string().valid(
        Permissions.DELETE,
        Permissions.READ,
        Permissions.SHARE,
        Permissions.UPLOAD_FILES,
        Permissions.WRITE
      )
    )
    .unique()
    .default([]),
});

export const addUsersToGroupBodyValidationSchema = Joi.object({
  users: Joi.array().items(Joi.string()).unique().min(1),
});
