import { ModelCtor, Model, Op } from 'sequelize';
import { IUser } from '../interfaces';
import { UserDTO } from '../dto';
import { BaseCRUDModel } from './base-crud-class.model';
import { UserDTOFields } from '../common';
import { User } from '../data-access';

class UserModel extends BaseCRUDModel<IUser, UserDTO> {
  constructor(private userData: ModelCtor<Model<any, any>>) {
    super();
  }

  async create(data: UserDTO): Promise<IUser> {
    return this.userData.create(data) as any;
  }

  async readAll({
    limit,
    searchSubstring,
  }: {
    limit?: number;
    searchSubstring?: string;
  }): Promise<IUser[]> {
    return this.userData.findAll({
      limit,
      where: {
        [UserDTOFields.LOGIN]: {
          [Op.like]: `%${searchSubstring}%`,
        },
      },
    }) as any;
  }

  async readOne(id: string): Promise<IUser> {
    return this.userData.findOne({ where: { id } }) as any;
  }

  async update(data: UserDTO, id: string): Promise<IUser> {
    return this.userData
      .findOne({ where: { id } })
      .then((user) => user.update(data)) as any;
  }

  async delete(id: string): Promise<void> {
    await this.userData.destroy({ where: { id } });
  }
}

export default new UserModel(User);
