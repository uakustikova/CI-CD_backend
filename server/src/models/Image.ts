import {
  DataTypes,
  Model,
  UUIDV4,
} from 'sequelize';

import database from '../config/database';
import { paranoid, underscored } from '../config/modelOptions';

const tableName = 'images';

interface ImageModel {
  id: string;
  path: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

class Image extends Model<Partial<ImageModel>> {
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    path: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName,
    underscored,
    sequelize: database,
    paranoid,
  },
);

export default Image;
