import { Model, BuildOptions, ModelAttributes, DataTypes } from 'sequelize'

/**
 * 札记表
 * @class Note
 * @extends {Model}
 */
class Note extends Model {
  public id!: number;
  public user_id!: number;
  public title!: number; // 标题
  public content!: string; // 内容
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type Statics = typeof Model & {
  new(values?: object, options?: BuildOptions): Note
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING(32),
    unique: true,
    allowNull: false,
    validate: {
      len: [2, 32]
    }
  },
  content: {
    type: DataTypes.TEXT,
  }
}

export const Options = {
  comment: '札记表'
}