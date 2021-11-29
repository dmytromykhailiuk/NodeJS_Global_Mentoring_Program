import { Permissions } from '../common';

export interface GroupDTO {
  name: string;
  permmisions: Permissions[];
}

export interface AddUserToGroupDTO {
  users: string[];
}
