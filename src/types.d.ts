// public types
export interface IAnyKey {
  [key: string]: any
}

export enum EJsDataType {
  number = 'number',
  string = 'string',
  boolean = 'boolean',
  regexp = 'regexp',
  function = 'function',
  object = 'object',
  array = 'array'
}