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
import { logger } from '../config';

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
  logger.info(`200 - ${req.originalUrl} - ${req.method} - query: ${req.query}`);
  res.status(StatusCode.OK).json(groups);
};

export const getGroupByID = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  const group: IGroup = await groupService.getGroupById(req.params.id);
  if (!group) {
    logger.error(
      `${StatusCode.NOT_FOUND} - ${req.originalUrl} - ${req.method} - message: ${ErrorMessage.GROUP_DOESNT_EXISTS}`
    );
    res.status(StatusCode.NOT_FOUND).json(ErrorMessage.GROUP_DOESNT_EXISTS);
  } else {
    logger.info(`${StatusCode.OK} - ${req.originalUrl} - ${req.method}`);
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
      logger.info(
        `${StatusCode.CREATED} - ${req.originalUrl} - ${req.method} - data: ${req.body}`
      );
      res.status(StatusCode.CREATED).json(group);
    })
    .catch(() => {
      logger.error(
        `${StatusCode.CONFLICT} - ${req.originalUrl} - ${req.method} - message: ${ErrorMessage.GROUP_WITH_SAME_NAME_ALREADY_EXISTS} - data: ${req.body}`
      );
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
  logger.info(
    `${StatusCode.OK} - ${req.originalUrl} - ${req.method} - data: ${req.body}`
  );
  res.status(StatusCode.OK).json(group);
};

export const deleteGroup = async (
  req: Request<{ [ID]: string }>,
  res: Response
): Promise<void> => {
  await groupService.deleteGroup(req.params.id);
  logger.info(`${StatusCode.NO_CONTENT} - ${req.originalUrl} - ${req.method}`);
  res.status(StatusCode.NO_CONTENT).end();
};

export const addUsersToGroup = (
  req: Request<{ [ID]: string }, {}, AddUserToGroupDTO>,
  res: Response
): void => {
  groupService
    .addUsersToGroup(req.params.id, req.body.users)
    .then(() => {
      logger.info(
        `${StatusCode.OK} - ${req.originalUrl} - ${req.method} - data: ${req.body}`
      );
      res
        .status(StatusCode.OK)
        .json({ message: 'Users successfully added to group!' });
    })
    .catch(({ message }) => {
      logger.error(
        `${StatusCode.BAD_REQUEST} - ${req.originalUrl} - ${req.method} - message: ${message} - data: ${req.body}`
      );
      res.status(StatusCode.BAD_REQUEST).json({ message });
    });
};
