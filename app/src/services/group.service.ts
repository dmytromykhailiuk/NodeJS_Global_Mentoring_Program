import { IGroup } from '../interfaces';
import { GroupDTO } from '../dto';
import { groupModel, BaseCRUDModel } from '../models';
import { sequelize } from '../config';
import { Logger } from '../common';
import userService from './user.service';

class GroupService {
  private readonly DEFAULT_LIMIT = 10_000;

  private readonly DEFAULT_NAME_SUBSTRING = '';

  constructor(private groupData: BaseCRUDModel<IGroup, GroupDTO>) {}

  @Logger('GroupService')
  async getGroups(
    limit: number = this.DEFAULT_LIMIT,
    nameSubstring: string = this.DEFAULT_NAME_SUBSTRING
  ): Promise<IGroup[]> {
    return this.groupData.readAll({
      limit,
      propertyName: 'name',
      searchSubstring: nameSubstring,
    });
  }

  @Logger('GroupService')
  async getGroupById(id: string): Promise<IGroup> {
    return this.groupData.readOne('id', id);
  }

  @Logger('GroupService')
  async createGroup(groupDTO: GroupDTO): Promise<IGroup> {
    return this.groupData.create(groupDTO);
  }

  @Logger('GroupService')
  async updateGroup(groupData: GroupDTO, groupID: string): Promise<IGroup> {
    return this.groupData.update(groupData, 'id', groupID);
  }

  @Logger('GroupService')
  async deleteGroup(id: string): Promise<void> {
    return this.groupData.delete('id', id);
  }

  @Logger('GroupService')
  async isExistingID(id: string): Promise<boolean> {
    const group: IGroup = await this.getGroupById(id);
    return Boolean(group);
  }

  @Logger('GroupService')
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    const group = (await this.getGroupById(groupId)) as any;
    return sequelize.transaction().then(async (t) => {
      for await (const userID of userIds) {
        const user = userService.getUserById(userID);
        if (!user) {
          throw Error(`User with ${userID} doesn't exist!`);
        }
        await group.addUser(user, { transaction: t });
      }
    });
  }
}

export default new GroupService(groupModel);
