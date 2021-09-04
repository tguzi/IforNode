import { Model, BuildOptions, DataTypes, ModelAttributes } from 'sequelize'

/**
 * 周期表
 * @class Period
 * @extends {Model}
 */
class Period extends Model {
  public id!: number;
  public title!: string; // 周期主题
  public description!: string; // 周期详情
  public end_time!: Date; // 周期结束时间
  public start_time!: Date; // 周期开始时间
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type Statics = typeof Model & {
  new (values?: object, options?: BuildOptions): Period
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    comment: '周期ID'
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.STRING,
  },
  end_time: {
    type: DataTypes.DATE
  },
  start_time: {
    type: DataTypes.DATE
  }
}

export const Options = {
  comment: '分类表'
}