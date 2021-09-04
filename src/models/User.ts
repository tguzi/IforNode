import { Model, BuildOptions, ModelAttributes, DataTypes } from 'sequelize'

/**
 * 用户表
 * @class User
 * @extends {Model}
 */
class User extends Model {
  public id!: number;
  public nickname!: string; // 昵称
  public ip!: string; // ip
  public avatar!: string; // 头像
  public password!: string; // 密码
  public email!: string; // 邮箱
  public age!: number; // 年龄
  public phone!: string; // 手机
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type Statics = typeof Model & {
  new (values?: object, options?: BuildOptions): User
}

export const Models: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    comment: '用户ID'
  },
  ip: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '用户IP',
    validate: {
      isIP: {
        msg: 'ip格式不对'
      },
    }
  },
  nickname: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
    comment: '用户昵称'
  },
  avatar: {
    type: DataTypes.STRING(255),
    comment: '用户头像',
    validate: {
      isUrl: {
        msg: '头像出错'
      }
    }
  },
  password: {
    type: DataTypes.STRING(32),
    comment: '用户密码'
  },
  email: {
    type: DataTypes.STRING(16),
    comment: '用户邮箱',
    unique: true,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.TINYINT({ length: 3 }),
    comment: '用户年龄',
    validate: {
      min: 0,
      max: 200
    }
  },
  phone: {
    type: DataTypes.STRING(13),
    comment: '用户手机号',
    unique: true,
    validate: {
      is: /^1[3|4|5|8][0-9]\d{8}$/
    }
  }
}

export const Options = {
  comment: '用户表'
}
