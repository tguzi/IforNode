import { Model, BuildOptions, ModelAttributes, DataTypes } from 'sequelize'

/**
 * 分类表
 * @class Sort
 * @extends {Model}
 */
class Sort extends Model {
  public id!: number;
  public name!: string; // 分类名
  public alias!: string; // 分类别名
  public description!: string; // 分类描述
  public parent_id!: number; // 父分类id
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type Statics = typeof Model & {
  new (values?: object, options?: BuildOptions): Sort
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    comment: '分类ID'
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 20]
    }
  },
  alias: {
    type: DataTypes.STRING(15),
  },
  description: {
    type: DataTypes.TEXT
  },
  parent_id: {
    type: DataTypes.INTEGER
  }
}

export const Options = {
  comment: '分类表'
}