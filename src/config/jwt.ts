export default {
  JWTSECRET: 'tgu',
  JWTSTIME: 60 * 60 * 12,
  TOKENEXPIRESTIME: 60 * 60 * 2,
  JWTUNLESS: [
    /\/user\/login/,
    /\/user\/register/
  ],
  IS_AUTH: true,
  IS_NONCESTR: false
}