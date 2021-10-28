import { Request, Response } from 'express';
import userService from '../services/user.service';
import { StatusCode, ID, QueryParamsForGetUserRequest } from '../common';
import { IUser } from '../interfaces';
import { UserDTO } from '../dto';

interface IGetUsersQueryParams {
  [QueryParamsForGetUserRequest.LIMIT]: number;
  [QueryParamsForGetUserRequest.LOGIN_SUBSTRING]: string;
}

export const getUsers = (
  req: Request<{}, {}, {}, IGetUsersQueryParams>,
  res: Response
): void => {
  const { limit, loginSubstring } = req.query;
  res.status(StatusCode.OK);
  res.json(userService.getUsers(limit, loginSubstring));
};

export const getUserByID = (
  req: Request<{ [ID]: string }>,
  res: Response
): void => {
  const user: IUser = userService.getUserById(req.params.id);
  res.status(StatusCode.OK);
  res.json(user);
};

export const createUser = (
  req: Request<{}, {}, UserDTO>,
  res: Response
): void => {
  const user: IUser = userService.createUser(req.body);
  res.status(StatusCode.CREATED);
  res.json(user);
};

export const updateUser = (
  req: Request<{ [ID]: string }, {}, UserDTO>,
  res: Response
): void => {
  const user: IUser = userService.updateUser(req.body, req.params.id);
  res.status(StatusCode.OK);
  res.json(user);
};

export const deleteUser = (
  req: Request<{ [ID]: string }>,
  res: Response
): void => {
  userService.deleteUser(req.params.id);
  res.status(StatusCode.NO_CONTENT);
  res.end();
};
