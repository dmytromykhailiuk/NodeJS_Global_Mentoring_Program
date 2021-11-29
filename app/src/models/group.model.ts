import { IGroup } from '../interfaces';
import { GroupDTO } from '../dto';
import { BaseCRUDModel } from './base-crud-class.model';
import { User, Group } from '../data-access';

class GroupModel extends BaseCRUDModel<IGroup, GroupDTO> {}

export default new GroupModel(Group, User);
