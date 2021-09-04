import { Model, ModelCtor } from 'sequelize'

export enum ERelation {
  hasOne = 'hasOne',
  belongsTo = 'belongsTo',
  hasMany = 'hasMany',
  belongsToMany = 'belongsToMany',
}

export enum EDataTypes {
  STRING = 'STRING',
  TEXT = 'TEXT',
  INTEGER = 'INTEGER',
  BIGINT = 'BIGINT',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  DECIMAL = 'DECIMAL',
  DATE = 'DATE',
  DATEONLY = 'DATEONLY',
  BOOLEAN = 'BOOLEAN',
  ENUM = 'ENUM',
  BLOB = 'BLOB',
  JSON = 'JSON',
  UUID = 'UUID',
}

export interface anyKey {
  [key: string]: any;
}

export interface IModelGroup {
  [key: string]: typeof Model;
}

export interface IAssConfig {
  origin: string;
  relation: ERelation;
  target: string;
  sourceKey?: string;
  primaryKey?: string;
  as?: string;
  foreignKey?: string;
  targetKey?: string;
}

/**
 * @description Models
 */
export type TModels = {
  Article: ModelCtor<Model<any, any>>;
  Note: ModelCtor<Model<any, any>>;
  ArticleLabel: ModelCtor<Model<any, any>>;
  ArticleSort: ModelCtor<Model<any, any>>;
  Friends: ModelCtor<Model<any, any>>;
  Label: ModelCtor<Model<any, any>>;
  Momment: ModelCtor<Model<any, any>>;
  Period: ModelCtor<Model<any, any>>;
  Sort: ModelCtor<Model<any, any>>;
  Topic: ModelCtor<Model<any, any>>;
  User: ModelCtor<Model<any, any>>;
  [key: string]: ModelCtor<Model<any, any>>;
}