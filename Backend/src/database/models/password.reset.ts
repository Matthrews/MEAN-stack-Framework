import { DataTypes, Model, ModelAttributes } from "sequelize";

import { DataBaseTableNames, DataBaseModelNames } from "../constants";

import { DbModelFieldInit } from "../db-structure.model";

import { db } from '../db.provider';

import { associative } from './associate.decorator';

export interface IPasswordResetModel {
  id: number;
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const modelAttributes: DbModelFieldInit<Partial<IPasswordResetModel>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  token: {
    type: DataTypes.STRING,
  },
};
@associative
export class PasswordResetDbModel extends Model {
  static associate({
    UserDbModel
  }: any) {
    this.hasMany(UserDbModel, { foreignKey: 'email', as: 'user' });
  }
}

PasswordResetDbModel.init(modelAttributes as ModelAttributes, {
  sequelize: db,
  modelName: DataBaseModelNames.PASSWORD_RESET,
  tableName: DataBaseTableNames.PASSWORD_RESET,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true
});
