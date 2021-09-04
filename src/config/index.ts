import JWTConfig from './jwt'
import MySqlConfig from './mysql'
import QiniuConfig from './qiniu'

// Process env
const env = (process.env.NODE_ENV || 'development') as 'development' | 'test' | 'production'

// default config
const defaultConfig = {
  env: env,
  JWT_CONFIG: JWTConfig,
  MYSQL_CONFIG: MySqlConfig[env],
  QINIU_CONFIG: QiniuConfig[env],
  PORT: 8080,
  OPEN_API_DOC: true,
}

export default defaultConfig