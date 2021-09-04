import fs from 'fs'
import path from 'path'
import { Sequelize, Options } from 'sequelize'

import config from 'config/index'
import associations from './association'
import { anyKey, IModelGroup, IAssConfig, TModels } from './types'

const { USER, PASSWORD, PORT, DB, HOST } = config.MYSQL_CONFIG

class ClassSequelize {
  constructor() {
    this.sequelizeManager = new Sequelize(DB, USER, PASSWORD, this.MYSQL_OPTION)
  }

  // group models
  private models: IModelGroup = {}

  // sequelize manager
  public readonly sequelizeManager: Sequelize

  // init sequelize option
  private readonly MYSQL_OPTION: Options = {
    dialect: 'mysql',
    host: HOST,
    port: PORT,
    define: {
      underscored: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }

  /**
   * init sequelize
   * @returns {Promise<void>}
   */
  public async init(): Promise<void> {
    return this.sequelizeManager
      .authenticate()
      .then(() => {
        console.info('mysql connect success!')
      }).catch((error: Error) => {
        console.error('cannot connect mysql: ', error.message)
      })
  }

  /**
   * auto registry models
   */
  public registryModels () {
    const modelDir = path.resolve(__dirname, '../models')
    const dirs: anyKey = fs.readdirSync(modelDir)
    for (let key in dirs) {
      const name: string = dirs[key].replace(/.[j|t]s$/, '')
      const filepath = path.resolve(modelDir, dirs[key])
      const file = require(filepath)
      // const STATICS = file['Statics']
      const MODELS = file['Models']
      const OPTIONS = file['Options']
      this.models[name] = this.sequelizeManager.define(name, MODELS, OPTIONS)
    }
  }

  /**
   * force sync models
   * !!!!!!
   * Dangerous
   * Dangerous
   * Dangerous
   * 
   */
  public syncModels () {
    const isProd = process.env.NODE_ENV === 'production'
    if (!isProd) {
      this.sequelizeManager.sync({ force: false }).then(() => {
        console.log('Sync models sucessful!')
      }, (err) => {
        console.log('Sync models failed: ', err.message)
      })
    }
  }

  /**
   * build association
   */
  public buildAssociation() {
    associations.forEach((association: IAssConfig) => {
      const { origin, target, relation } = association
      if (!origin || !target || !this.models[origin] || !this.models[target]) {
        console.warn('[BUILD ASSOCIATION WARN]', `not found the association model: ${origin}/${target}`)
        return
      }
      try {
        const options = { ...association }
        Reflect.deleteProperty(options, 'target')
        Reflect.deleteProperty(options, 'relation')
        Reflect.deleteProperty(options, 'origin')
        const originModel: any = this.models[origin]
        const targetModel = this.getModel(target)
        originModel[relation](targetModel, options)
      } catch (e) {
        console.error('【BUILDE ASSIONSTION ERROR】', e)
      }
    })
  }

  /**
   * get models
   * @returns 
   */
  public getModels () {
    return this.models as TModels
  }

  /**
   * get single model
   * @param {string} modelName
   * @returns {ModelCtor<Model>}
   */
  getModel(modelName: string) {
    return this.sequelizeManager.model(modelName)
  }

}

export const sequelize = new ClassSequelize()

sequelize.init()

sequelize.registryModels()

sequelize.buildAssociation()

// dangerous
// sequelize.syncModels()

export const sequelizeManager = sequelize.sequelizeManager

export const models = sequelize.getModels()

export const getModel = sequelize.getModel

export default ClassSequelize
