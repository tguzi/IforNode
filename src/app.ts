import path from 'path'
import Koa, { ParameterizedContext } from 'koa'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import cors from 'koa2-cors'
import jwt from 'koa-jwt'
import json from 'koa-json'

// Auxiliary tool
import './utils/alias'
import 'utils/customConsole'
// registry alias
import 'module-alias/register'
import config from 'config/index'
import { registryRouter } from 'decorator/controller'
import router from './router'
import { getLocalIp } from 'utils/index'

// mysql data models
import './mysql'

// schedule task
import './schedule'

// app
const app = new Koa()

// koa-logger
app.use(logger())

// koa-json
app.use(json({ pretty: false, param: 'pretty' }))

// koa-body
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024
  }
}))

// static resources
const staticPath = path.join(__dirname, '../public')
app.use(koaStatic(staticPath))

// koa2-cors
app.use(cors({
  origin: (): string => '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// koa-jwt
const { JWTSECRET, JWTUNLESS } = config.JWT_CONFIG
app.use(jwt({
  secret: JWTSECRET,
  passthrough: true,
}).unless({
  path: JWTUNLESS,
}))

// restful api
registryRouter(app)

// router
app
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = (new Date()).getDate();
  let timer: number
  try {
    timer = (new Date()).getDate()
    const ms = timer - start
    console.log(`method: ${ctx.method}, url:${ctx.url} - ${ms}ms`)
    await next()
  } catch (e) {
    timer = (new Date()).getDate()
    const ms = timer - start
    console.error(`method: ${ctx.method}, url:${ctx.url} - ${ms}ms`)
  }
})

// listen port
app.listen(config.PORT, () => {
  console.info(`Server running on http://${getLocalIp()}:${config.PORT}`)
})

// listen error
app.on('error', (error: Error, ctx: ParameterizedContext) => {
  ctx.body = error;
})

export default app