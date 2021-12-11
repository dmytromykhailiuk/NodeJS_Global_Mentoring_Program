import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { UserDTOFields } from '../common/enums';

export const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  [UserDTOFields.LOGIN]: { type: DataTypes.STRING, unique: true },
  [UserDTOFields.PASSWORD]: { type: DataTypes.STRING },
  [UserDTOFields.AGE]: { type: DataTypes.INTEGER },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export const Group = sequelize.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  permission: DataTypes.ARRAY({ type: DataTypes.STRING }),
});

export const UserGroup = sequelize.define('user_group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
