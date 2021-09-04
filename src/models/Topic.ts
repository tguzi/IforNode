import { Model, BuildOptions, DataTypes, ModelAttributes } from 'sequelize'

/**
 * 话题
 * @class Topic
 * @extends {Model}
 */
class Topic extends Model {
  public id!: number;
  public period_id!: number; // 周期 id
  public article_id!: number; // 文章 id
  public user_id!: number;
  public name!: string; // 话题名称
  public description!: string; // 话题描述
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type Statics = typeof Model & {
  new (values?: object, options?: BuildOptions): Topic
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    comment: '话题ID'
  },
  // period_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'Period',
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
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'User',
  //     key: 'id'
  //   }
  // },
  name: {
    type: DataTypes.STRING(32),
    validate: {
      len: [2, 32]
    }
  },
  description: {
    type: DataTypes.STRING(255)
  }
}

export const Options = {
  comment: '话题表'
}
