export enum EParamType {
  headers = 'headers',
  body = 'body',
  query = 'query',
}

export type TParamsItemObject = Partial<{
  type: string;
  required: boolean;
  rule: RegExp;
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