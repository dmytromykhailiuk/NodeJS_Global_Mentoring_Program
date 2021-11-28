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
  res.status(StatusCode.OK).json(users);
};

export const getUserByID = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  const user: IUser = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(StatusCode.NOT_FOUND).json(ErrorMessage.USER_DOESNT_EXISTS);
  } else {
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
      res.status(StatusCode.CREATED).json(user);
    })
    .catch(() => {
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
  res.status(StatusCode.OK).json(user);
};

export const deleteUser = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  await userService.deleteUser(req.params.id);
  res.status(StatusCode.NO_CONTENT).end();
};
