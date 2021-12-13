import { IUser } from '../interfaces';
import { UserDTO } from '../dto';
import { userModel, BaseCRUDModel } from '../models';
import { UserDTOFields, Logger } from '../common';

class UserService {
  private readonly DEFAULT_LIMIT = 10_000;

  private readonly DEFAULT_LOGIN_SUBSTRING = '';

  constructor(private userData: BaseCRUDModel<IUser, UserDTO>) {}

  @Logger('UserService')
  async getUsers(
    limit: number = this.DEFAULT_LIMIT,
    loginSubstring: string = this.DEFAULT_LOGIN_SUBSTRING
  ): Promise<IUser[]> {
    return this.userData.readAll({
      limit,
      propertyName: UserDTOFields.LOGIN,
      searchSubstring: loginSubstring,
    });
  }

  @Logger('UserService')
  async getUserById(id: string): Promise<IUser> {
    return this.userData.readOne('id', id);
  }

  @Logger('UserService')
  async createUser(userDTO: UserDTO): Promise<IUser> {
    return this.userData.create(userDTO);
  }

  @Logger('UserService')
  async updateUser(userData: UserDTO, userID: string): Promise<IUser> {
    return this.userData.update(userData, 'id', userID);
  }

  @Logger('UserService')
  async deleteUser(id: string): Promise<IUser> {
    return this.updateUser({ isDeleted: true } as any, id);
  }

  @Logger('UserService')
  async isExistingID(id: string): Promise<boolean> {
    const user: IUser = await this.getUserById(id);
    return Boolean(user);
  }
}

export default new UserService(userModel);
