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
