import { Middleware, ParameterizedContext, DefaultState, DefaultContext } from 'koa'

export enum EBaseRequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  // OPTION = 'option',
  PATCH = 'patch',
  ALL = 'all',
}

export interface IDecoratorController {
  url: string;
  method: string;
  middleware: Array<Middleware>;
  handler: Middleware;
  constructor: any;
}

export interface IBaseRequestParams {
  method?: EBaseRequestMethod;
  path: string;
}

export interface IDecoratorFnPrototype {
  baseRequestMethod: EBaseRequestMethod;
  baseRequestUrl: string;
  baseRequestMiddlewares?: any;
}

export type TParamsItemObject = Partial<{
  type: string;
  required: boolean;
  rules: RegExp[] | RegExp;
  message: string;
  defaultValue: any;
  value: any;
  minValue: number;
  maxValue: number;
  decimalMin: number;
  decimalMax: number;
  isDate: boolean;
  past: any;
  future: any;
  enumValue: any[] | { [key: string]: any }
}>

export type TParamsItem = boolean | number | string | RegExp | TParamsItemObject | any[];

export interface IVerifyParams {
  [key: string]: TParamsItem
}