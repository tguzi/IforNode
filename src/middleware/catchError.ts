import { ParameterizedContext } from 'koa'
import AbstractResponse from 'abstract/response'

class CatchError extends AbstractResponse {

  /**
   * router try catch
   * @param {Function} fn
   * @param {string} message
   * @param {*} _this
   * @returns 
   */
  catchErrorRouter(fn: Function, message: string, _this: any) {
    return async (ctx: ParameterizedContext, next: Function) => {
      try {
        await fn.call(_this, ctx, next)
      } catch (e) {
        const errMsg = typeof e === 'string' ? e : (e && e.message ? e.message : '')
        const str = message || errMsg || 'an unknown error'
        console.error('[CATCH ERROR ROUTER]', str)
        super.error(ctx, str)
      }
    }
  }
}

const catchErro = new CatchError()

export const catchErrorRouter = catchErro.catchErrorRouter.bind(catchErro)

export default CatchError