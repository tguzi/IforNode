import Koa from 'koa'
import { exportFile } from 'utils/index'
import { EBaseRequestMethod } from './types'
import DecoratorController, { rootRouter } from './controller'
import { verifyBearer } from 'middleware/authorization'
import { verifyBody, verifyHeaders, verifyQuery } from 'middleware/verifyRequestParams'
import { catchErrorRouter } from 'middleware/catchError'

const DController = new DecoratorController()

// registry router
export const registryRouter = (app: Koa) => {
  // auto import all controller
  exportFile('/controller')
  // insert router
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
}

// registry controller - base prefix
export const Controller = DController.controller.bind(DController)

// request mapping
export const mappingRequest = DController.RequestMapping.bind(DController)

// middleware mapping no params
export const mappingMiddleware = DController.MiddlewareMapping.bind(DController)

// middleware mappgin with params
export const mappingMiddlewareWithParams = DController.MiddlewareMappingWithParams.bind(DController)

// intercept origin function
export const interceptOriginFn = DController.interceptOriginFn.bind(DController)

// method
export const get = mappingRequest(EBaseRequestMethod.GET)
export const post = mappingRequest(EBaseRequestMethod.POST)
export const del = mappingRequest(EBaseRequestMethod.DELETE)
export const patch = mappingRequest(EBaseRequestMethod.PATCH)
export const put = mappingRequest(EBaseRequestMethod.PUT)
export const all = mappingRequest(EBaseRequestMethod.ALL)

// authorization middleware
export const auth = mappingMiddleware(verifyBearer)

// params middleware
export const query = mappingMiddlewareWithParams(verifyQuery)
export const headers = mappingMiddlewareWithParams(verifyHeaders)
export const body = mappingMiddlewareWithParams(verifyBody)

// try catch middleware
export const catchError = interceptOriginFn(catchErrorRouter)
