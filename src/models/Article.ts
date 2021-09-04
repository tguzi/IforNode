import { Model, BuildOptions, ModelAttributes, DataTypes } from 'sequelize'

/**
 * 文章表
 * @class Article
 * @extends {Model}
 */
class Article extends Model {
  public id!: number;
  // public user_id!: number;
  public title!: number; // 标题
  public cover!: string; // 封面
  public content!: string; // 内容
  public view_count!: number; // 浏览数
  public comment_count!: number; // 评论数
  public like_count!: number; // 点赞数
  public status!: string; // 文章状态 normal/deleted/inaudit 正常/删除/审核
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type Statics = typeof Model & {
  new (values?: object, options?: BuildOptions): Article
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
  cover: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  content: {
    type: DataTypes.TEXT,
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comment_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  like_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM,
    values: ['normal', 'deleted', 'inaudit']
  }
}

export const Options = {
  comment: '文章表'
}