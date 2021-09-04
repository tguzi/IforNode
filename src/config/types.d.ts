export interface IMysql {
  USER: string,
  PASSWORD: string,
  DB: string,
  HOST: string,
  PORT: number,
  SYNC: boolean
}

export interface IJwt {
  JWTSECRET: string,
  JWTSTIME: number,
  TOKENEXPIRESTIME: number,
  JWTUNLESS: RegExp[],
  IS_AUTH: boolean,
  IS_NONCESTR: boolean,
  RSA_PUBLIC_KEY: string,
  RSA_PRIVATE_KEY: string
}

export interface IDevParam {
  PORT: string,
  MYSQL_CONFIG: IMysql,
  JWT_CONFIG: IJwt
}

export interface IQiniu {
  ACCESS_KEY: string;
  SECRET_KEY: string;
  BUCKET: string;
  EXPIRES: number;
}