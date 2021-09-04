import { ParameterizedContext } from 'koa'
import moment from 'moment'
import AbstractResponse from 'abstract/response'
import { IVerifyParams, EParamType, TParamsItem, TParamsItemObject } from './types'
import { getVariableType, isBaseVarType, isNull } from 'utils/index'

class VerifyRequestParams extends AbstractResponse {

  /**
   * verify params by rule
   * @private
   * @param {*} params
   * @param {IVerifyParams} rule
   * @returns {string}
   */
  private verifyByRule (params: any, rule: IVerifyParams): string {
    // allowed any params
    if (!rule || !Object.keys(rule).length) {
      return ''
    }
    // verify rule item
    for (const key in rule) {
      const val = rule[key]
      const ctxVal = params[key]
      const errStr = this.calibrationParamsAndRule(val, ctxVal, key)
      if (errStr) {
        return errStr
      }
    }
    return ''
  }

  /**
   * calibration both params and rule
   * @private
   * @param {TParamsItem} ruleVal
   * @param {*} ctxVal
   * @param {string} key
   * @returns {string}
   */
  private calibrationParamsAndRule (ruleVal: TParamsItem, ctxVal: any, key: string): string {
    let errStr = ''
    // basics data type
    if (isBaseVarType(ruleVal)) {
      errStr = this.calibrationBasicsType(ruleVal, ctxVal, key)
    } else if (ruleVal instanceof RegExp) {
      // regexp
      errStr = this.calibrationRegExp(ruleVal, ctxVal, key)
    } else if (ruleVal instanceof Array) {
      // array
      errStr = this.calibrationArray(ruleVal, ctxVal, key)
    } else if (ruleVal instanceof Object) {
      errStr = this.calibrationObject(ruleVal, ctxVal, key)
    }
    return errStr
  }

  /**
   * calibration for basics data type
   * @private
   * @param {TParamsItem} ruleVal
   * @param {*} ctxVal
   * @param {string} key
   * @returns {string}
   */
  private calibrationBasicsType (ruleVal: TParamsItem, ctxVal: any, key: string): string {
    if (typeof ruleVal !== typeof ctxVal) {
      return `Request parameter "${key}" type error`
    } else if (ctxVal !== ruleVal) {
      return `Request parameter "${key}" value error`
    } else {
      return ''
    }
  }

  /**
   * calibration for regexp
   * @private
   * @param {RegExp} ruleVal
   * @param {*} ctxVal
   * @param {string} key
   * @returns {(string|void)}
   */
  private calibrationRegExp (ruleVal: RegExp, ctxVal: any, key: string): string {
    if (ruleVal.test(ctxVal)) {
      return `Request parameter "${key}" format error`
    } else {
      return ''
    }
  }

  /**
   * calibration fro array
   * @private
   * @param {Array<any>} ruleVal
   * @param {*} ctxVal
   * @param {string} key
   * @returns {string}
   */
  private calibrationArray (ruleVal: Array<any>, ctxVal: any, key: string): string {
    if (!ruleVal.includes(ctxVal)) {
      return `Request parameter "${key}" must be one of "${ruleVal}"`
    }
    return ''
  }

  /**
   * calibration for object
   * @private
   * @param {RegExp} ruleVal
   * @param {*} ctxVal
   * @param {string} key
   * @returns {(string|void)}
   */
  private calibrationObject (ruleVal: TParamsItemObject, ctxVal: any, key: string): string {
    const ctxValType = getVariableType(ctxVal)
    const {
      message,
      type,
      required,
      rule,
      value,
      minValue,
      maxValue,
      decimalMax,
      decimalMin,
      isDate,
      enumValue
    } = ruleVal
    // no null
    if (required && isNull(ctxVal)) {
      return message || `Request parameter "${key}" cannot be empty`
    }
    // diffrance type
    if (type && ctxValType !== type) {
      return message || `Request parameter "${key}" type error`
    }
    // regexp test failed
    if (rule && getVariableType(rule) === 'regexp' && !rule.test(ctxVal)) {
      return message || `Request parameter "${key}" format error`
    }
    // value check
    if (value !== undefined && ctxVal !== value) {
      return message || `Request parameter "${key}" must be equal to "${value}"`
    }
    // value range
    if (typeof ctxVal === 'number' && typeof minValue === 'number' && ctxVal >= minValue) {
      return message || `Request parameter "${key}" must greater than or equal to "${value}"`
    }
    if (typeof ctxVal === 'number' && typeof decimalMin === 'number' && ctxVal > decimalMin) {
      return message || `Request parameter "${key}" must greater than or equal to "${value}"`
    }
    if (typeof ctxVal === 'number' && typeof maxValue === 'number' && ctxVal <= maxValue) {
      return message || `Request parameter "${key}" must be less than or equal to "${value}"`
    }
    if (typeof ctxVal === 'number' && typeof decimalMax === 'number' && ctxVal < decimalMax) {
      return message || `Request parameter "${key}" must be less than or equal to "${value}"`
    }
    // enum values
    if (enumValue && !enumValue.includes(ctxVal)) {
      return message || `Request parameter "${key}" must be one of "${enumValue}"`
    }
    // check data
    if (isDate && !moment.isDate(ctxVal)) {
      return message || `Request parameter "${key}" is not a date format`
    }
    return ''
  }

  /**
   * verify params
   * @param {EParamType} type
   * @returns 
   */
  verifyParams (type: EParamType) {
    return (verifyParams: IVerifyParams) => {
      return async (ctx: ParameterizedContext, next: Function) => {
        const params = ctx.request[type]
        const str = this.verifyByRule(params, verifyParams)
        if (!str) {
          await next()
        } else {
          super.preconditionFailed(ctx, str)
        }
      }
    }
  }

}

const verify = new VerifyRequestParams()

export const verifyQuery = verify.verifyParams.call(verify, EParamType.query)

export const verifyHeaders = verify.verifyParams.call(verify, EParamType.headers)

export const verifyBody = verify.verifyParams.call(verify, EParamType.body)

export default VerifyRequestParams