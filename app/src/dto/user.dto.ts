import { UserDTOFields } from '../common/enums';

export interface UserDTO {
  [UserDTOFields.LOGIN]: string;
  [UserDTOFields.PASSWORD]: string;
  [UserDTOFields.AGE]: number;
}
