import {
  DataTypes,
  Model,
  UUIDV4,
} from 'sequelize';

import database from '../config/database';
import { paranoid, underscored } from '../config/modelOptions';

const tableName = 'users';

interface UserModel {
  id: string;
  userNumber: number;
  role: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

class User extends Model<Partial<UserModel>> {
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
    },
    userName: {
      type: DataTypes.STRING(32),
    },
    firstName: {
      type: DataTypes.STRING(128),
    },
    lastName: {
      type: DataTypes.STRING(128),
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName,
    underscored,
    sequelize: database,
    paranoid,
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ['password'],
        },
      },
    },
  },
);

export default User;
