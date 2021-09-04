import { ParameterizedContext } from 'koa'
import states from './states'
import { ECode } from './types'

// response
abstract class AbstractResponse {

  /**
   * normal response
   * @param {ECode} type
   * @param {ParameterizedContext} ctx
   * @param {*} [data]
   * @param {string} [message]
   * @returns 
   */
  response (type: ECode, ctx: ParameterizedContext, data?: any, message?: string) {
    const res = states[type]
    // ctx.status = res.code
    const result = {
      message: message || res.message,
      code: res.code,
      data: data
    }
    ctx.body = result
  }

  /**
   * success
   * @param {ParameterizedContext} ctx
   * @param {*} res
   * @param {string} [msg]
   */
  success (ctx: ParameterizedContext, res: any, msg?: string) {
    this.response(ECode.success, ctx, res, msg)
  }

  /**
   * authorization
   * @param {ParameterizedContext} ctx
   * @param {string} msg
   */
  authorization (ctx: ParameterizedContext, msg?: string) {
    this.response(ECode.authorization, ctx, null, msg)
  }

  /**
   * precondition failed
   * @param {ParameterizedContext} ctx
   */
  preconditionFailed (ctx: ParameterizedContext, msg?: string) {
    this.response(ECode.preconditionFailed, ctx, null, msg)
  }

  /**
   * unknown
   * @param {ParameterizedContext} ctx
   * @param {string} [msg]
   */
  unknown (ctx: ParameterizedContext, msg?: string) {
    this.response(ECode.unknown, ctx, null, msg)
  }

  /**
   * error
   * @param {ParameterizedContext} ctx
   * @param {string} [msg]
   */
  error (ctx: ParameterizedContext, msg?: string) {
    this.response(ECode.error, ctx, null, msg)
  }

}

export * from './types'

export const enumState = states

export default AbstractResponse