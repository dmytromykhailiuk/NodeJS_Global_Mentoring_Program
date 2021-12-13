import { Request, Response } from 'express';
import userService from '../services/user.service';
import {
  StatusCode,
  ID,
  QueryParamsForGetUserRequest,
  ErrorMessage,
} from '../common';
import { IUser } from '../interfaces';
import { UserDTO } from '../dto';
import { logger } from '../config';

interface IGetUsersQueryParams {
  [QueryParamsForGetUserRequest.LIMIT]: number;
  [QueryParamsForGetUserRequest.LOGIN_SUBSTRING]: string;
}

export const getUsers = async (
  req: Request<{}, {}, {}, IGetUsersQueryParams>,
  res: Response
): Promise<void> => {
  const { limit, loginSubstring } = req.query;
  const users = await userService.getUsers(limit, loginSubstring);
  logger.info(
    `${StatusCode.OK} - ${req.originalUrl} - ${req.method} - query: ${req.query}`
  );
  res.status(StatusCode.OK).json(users);
};

export const getUserByID = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  const user: IUser = await userService.getUserById(req.params.id);
  if (!user) {
    logger.error(
      `${StatusCode.NOT_FOUND} - ${req.originalUrl} - ${req.method} - message: ${ErrorMessage.USER_DOESNT_EXISTS}`
    );
    res.status(StatusCode.NOT_FOUND).json(ErrorMessage.USER_DOESNT_EXISTS);
  } else {
    logger.info(`${StatusCode.OK} - ${req.originalUrl} - ${req.method}`);
    res.status(StatusCode.OK).json(user);
  }
};

export const createUser = async (
  req: Request<{}, {}, UserDTO>,
  res: Response
): Promise<void> => {
  userService
    .createUser(req.body)
    .then((user: IUser) => {
      logger.info(
        `${StatusCode.CREATED} - ${req.originalUrl} - ${req.method} - body: ${req.body}`
      );
      res.status(StatusCode.CREATED).json(user);
    })
    .catch(() => {
      logger.error(
        `${StatusCode.CONFLICT} - ${req.originalUrl} - ${req.method} - message: ${ErrorMessage.USER_WITH_SAME_LOGIN_ALREADY_EXISTS}`
      );
      res.status(StatusCode.CONFLICT).json({
        message: ErrorMessage.USER_WITH_SAME_LOGIN_ALREADY_EXISTS,
      });
    });
};

export const updateUser = async (
  req: Request<{ [ID]: string }, {}, UserDTO>,
  res: Response
): Promise<void> => {
  const user: IUser = await userService.updateUser(req.body, req.params.id);
  logger.info(
    `${StatusCode.CREATED} - ${req.originalUrl} - ${req.method} - body: ${req.body}`
  );
  res.status(StatusCode.OK).json(user);
};

export const deleteUser = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  logger.info(`${StatusCode.NO_CONTENT} - ${req.originalUrl} - ${req.method}`);
  await userService.deleteUser(req.params.id);
  res.status(StatusCode.NO_CONTENT).end();
};
