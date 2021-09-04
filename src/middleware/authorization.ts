import { ParameterizedContext } from 'koa'
import { verify, sign } from 'jsonwebtoken'
import { v1 } from 'uuid'
import { crypted } from 'utils/crypto'
import AbstractResponse from 'abstract/response'
import config from 'config/index'

const { JWTSECRET, TOKENEXPIRESTIME } = config.JWT_CONFIG

class Authorization extends AbstractResponse {

  /**
   * verify user token
   * @param {ParameterizedContext} ctx
   * @param {Function} next
   * @returns {Promise<void>}
   */
  public async verifyBearer (ctx: ParameterizedContext, next: Function): Promise<void> {
    try {
      // no authorization field
      if (!ctx.header || !ctx.header.authorization) {
        return super.authorization(ctx, 'Request header authorization cannot be empty')
      }
      const authorization = ctx.header.authorization
      const scheme = authorization.substr(0, 6)
      if (scheme != 'Bearer') {
        return super.authorization(ctx, 'Wrong authorization bearer')
      }
      const credentials = authorization.substring(7)
      if (!credentials) {
        return super.authorization(ctx, 'Request header authorization cannot be empty')
      }
      // jsonwebtoken verify
      const authInfo = verify(credentials, JWTSECRET)
      if (!authInfo) {
        return super.authorization(ctx, 'authorization token expired')
      }
      ctx.jwtAuthInfo = authInfo
      await next()
    } catch (e) {
      return super.authorization(ctx, `authorization token error: ${e}`)
    }
  }

  /**
   * jwt sign
   * @param {*} params
   * @returns {string}
   */
  public jwtSign (params: any): string {
    const noncestr = v1()
    const token = sign({
      ...params,
      noncestr,
    }, JWTSECRET, { expiresIn: TOKENEXPIRESTIME, algorithm: 'HS256' })
    return token
  }

}

const authorization = new Authorization()

export const verifyBearer = authorization.verifyBearer

export const jwtSign = authorization.jwtSign

export default Authorization