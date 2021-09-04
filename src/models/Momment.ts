import { Model, BuildOptions, ModelAttributes, DataTypes } from 'sequelize'

/**
 * 评论表
 * @class 评论表
 * @extends {Model}
 */
class Momment extends Model {
  public id!: number;
  public user_id!: number;
  public article_id!: number;
  public like_count!: number; // 点赞数
  public content!: string; // 内容
  public parent_id!: number; // 父评论id
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type MommentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Momment
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'User',
  //     key: 'id'
  //   }
  // },
  // article_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'Article',
  //     key: 'id'
  //   }
  // },
  like_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  parent_id: {
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.TEXT,
  }
}

export const Options = {
  comment: '评论表'
}