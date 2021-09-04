import { Model, BuildOptions, ModelAttributes, DataTypes } from 'sequelize'

/**
 * 标签表
 * @class Label
 * @extends {Model}
 */
class Label extends Model {
  public id!: number;
  public name!: string;
  public alias!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type LabelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Label
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 8]
    }
  },
  alias: {
    type: DataTypes.STRING(8),
  },
  description: {
    type: DataTypes.TEXT,
  }
}

export const Options = {
  comment: '标签表'
}