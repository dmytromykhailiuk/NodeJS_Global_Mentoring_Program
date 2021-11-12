import { UserDTO } from '../dto';

export interface IUser extends UserDTO {
  id: string;
  isDeleted: boolean;
}
