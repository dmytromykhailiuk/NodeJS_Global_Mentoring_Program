import { IUser } from '../interfaces';
import { UserDTO } from '../dto';
import { BaseCRUDModel } from './base-crud-class.model';
import { User, Group } from '../data-access';

class UserModel extends BaseCRUDModel<IUser, UserDTO> {}

export default new UserModel(User, Group);
