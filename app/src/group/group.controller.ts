import { Request, Response } from 'express';
import { groupService } from '../services';
import {
  StatusCode,
  ID,
  QueryParamsForGetGroupRequest,
  ErrorMessage,
} from '../common';
import { IGroup } from '../interfaces';
import { GroupDTO, AddUserToGroupDTO } from '../dto';

interface IGetGroupQueryParams {
  [QueryParamsForGetGroupRequest.LIMIT]: number;
  [QueryParamsForGetGroupRequest.NAME_SUBSTRING]: string;
}

export const getGroups = async (
  req: Request<{}, {}, {}, IGetGroupQueryParams>,
  res: Response
): Promise<void> => {
  const { limit, nameSubstring } = req.query;
  const groups = await groupService.getGroups(limit, nameSubstring);
  res.status(StatusCode.OK).json(groups);
};

export const getGroupByID = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  const group: IGroup = await groupService.getGroupById(req.params.id);
  if (!group) {
    res.status(StatusCode.NOT_FOUND).json(ErrorMessage.GROUP_DOESNT_EXISTS);
  } else {
    res.status(StatusCode.OK).json(group);
  }
};

export const createGroup = async (
  req: Request<{}, {}, GroupDTO>,
  res: Response
): Promise<void> => {
  groupService
    .createGroup(req.body)
    .then((group: IGroup) => {
      res.status(StatusCode.CREATED).json(group);
    })
    .catch(() => {
      res.status(StatusCode.CONFLICT).json({
        message: ErrorMessage.GROUP_WITH_SAME_NAME_ALREADY_EXISTS,
      });
    });
};

export const updateGroup = async (
  req: Request<{ [ID]: string }, {}, GroupDTO>,
  res: Response
): Promise<void> => {
  const group: IGroup = await groupService.updateGroup(req.body, req.params.id);
  res.status(StatusCode.OK).json(group);
};

export const deleteGroup = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  await groupService.deleteGroup(req.params.id);
  res.status(StatusCode.NO_CONTENT).end();
};

export const addUsersToGroup = (
  req: Request<{ [ID]: string }, {}, AddUserToGroupDTO>,
  res: Response
): void => {
  groupService
    .addUsersToGroup(req.params.id, req.body.users)
    .then(() => {
      res
        .status(StatusCode.OK)
        .json({ message: 'Users successfully added to group!' });
    })
    .catch(({ message }) => {
      res.status(StatusCode.BAD_REQUEST).json({ message });
    });
};
