import Router from 'koa-router'
import { EBaseRequestMethod, IDecoratorFnPrototype } from './types'

export const rootRouter: Router = new Router({ prefix: '/api' })

class DController {

  /**
   * router controller decorator
   * @param {string} prefix
   * @returns {ClassDecorator}
   */
  public controller (prefix: string): ClassDecorator {
    const apiPrefix = prefix ? (prefix.startsWith('/') ? prefix : `/${prefix}`) : ''
    return (target: any): void => {
      try {
        // only used in class
        if (typeof target === 'object') {
          return
        }
        const descriptors = Object.getOwnPropertyDescriptors(target.prototype)
        // get all resetful api
        for (const key in descriptors) {
          if (key === 'constructor') {
            continue
          }
          const fn = descriptors[key].value
          if (typeof fn !== 'function') {
            continue
          }
          if (!fn?.prototype) {
            return
          }
          // registry api
          const {
            baseRequestMethod,
            baseRequestUrl,
            baseRequestMiddlewares,
          }: IDecoratorFnPrototype = fn.prototype
          const url = `${apiPrefix}${baseRequestUrl}`
          const _this = new target
          if (baseRequestMiddlewares) {
            rootRouter[baseRequestMethod](url, ...baseRequestMiddlewares, fn.bind(_this))
          } else {
            rootRouter[baseRequestMethod](url, fn.bind(_this))
          }
        }
      } catch (e) {
        console.error('[CONTROLLER ERROR]', e)
      }
    }
  }

  /**
   * mapping api
   * @param {EBaseRequestMethod} method
   * @returns {Function}
   */
  public RequestMapping (method: EBaseRequestMethod): Function {
    return (uri?: string) => {
      return (target: any, name: string, descriptor: PropertyDescriptor) => {
        try {
          // only used in function decorator
          if (typeof target === 'function' && name === undefined) {
            return
          }
          if (!descriptor?.value) {
            return
          }
          // auto complete url
          const url = uri ? (uri.startsWith('/') ? uri : `/${uri}`) : `/${name}`
          descriptor.value.prototype.baseRequestMethod = method
          descriptor.value.prototype.baseRequestUrl = url          
        } catch (e) {
          console.error('[REQUEST MAPPGIN ERROR]', e)
        }
      }
    }
  }

  /**
   * mappging middleware
   * @param {Function} fn
   * @returns {Function}
   */
  public MiddlewareMapping (fn: Function): Function {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
      try {
        // only used in function decorator
        if (typeof target === 'function' && name === undefined) {
          return
        }
        if (!descriptor?.value) {
          return
        }
        // insert middleware for method decorator
        if (descriptor.value.prototype.baseRequestMiddlewares) {
          descriptor.value.prototype.baseRequestMiddlewares.push(fn.bind(target))
        } else {
          descriptor.value.prototype.baseRequestMiddlewares = [fn.bind(target)]
        }
      } catch (e) {
        console.error('[MIDDLEWARE MAPPING ERROR]', e)
      }
    }
  }

  /**
   * mapping middleware with params
   * @param {Function} fn
   * @returns {Function}
   */
  public MiddlewareMappingWithParams (fn: Function): Function {
    return (params: any) => {
      return (target: any, name: string, descriptor: PropertyDescriptor) => {
        try {
          // only used in function decorator
          if (typeof target === 'function' && name === undefined) {
            return
          }
          if (!descriptor?.value) {
            return
          }
          // insert middleware for method decorator
          if (descriptor.value.prototype.baseRequestMiddlewares) {
            descriptor.value.prototype.baseRequestMiddlewares.push(fn.call(target, params))
          } else {
            descriptor.value.prototype.baseRequestMiddlewares = [fn.call(target, params)]
          }
        } catch (e) {
          console.error('[MIDE MAP PARAMS ERROR]', e)
        }
      }
    }
  }

  /**
   * intercepte origin function
   * @param {Function} fn
   * @returns {Function}
   */
  public interceptOriginFn (fn: Function): Function {
    return (msg: string) => {
      return (target: any, name: string, descriptor: PropertyDescriptor) => {
        try {
          // only used in function decorator
          if (typeof target === 'function' && name === undefined) {
            return
          }
          if (!descriptor.value) {
            return
          }
          const _this = target
          const originFn = descriptor.value
          descriptor.value = fn(originFn, msg, _this, target, name, descriptor)
        } catch (e) {
          console.error('[INTERCEPT ORIGIN FUNCTION ERROR]', e)
        }
      }
    }
  }

}

export default DController