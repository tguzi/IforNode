import crypto from 'crypto'

/**
 * @description The encryption algorithm
 * @class Crypto
 */
class CryptoUtils {

  /**
   * @description create random length string
   * @param {number} [len=16]
   * @returns {string}
   */
  public getRandomString (len: number = 16): string {
    const buf = crypto.randomBytes(len)
    return buf.toString('hex')
  }

  /**
   * @description md5 algorithm
   * @param {string} data
   * @returns {string}
   */
  public md5 (data: string): string {
    const hash = crypto.createHash('md5')
    hash.update(data)
    return hash.digest('hex')
  }

  /**
   * hmac algorithm
   * @param {string} data
   * @returns {string}
   */
  public hmac (data: string): string {
    const hmac = crypto.createHmac('sha256', 'secret-key')
    hmac.update(data)
    return hmac.digest('hex')
  }

  /**
   * @description aes algorithm encrypt
   * @param {string} data
   * @param {string} [key='password']
   * @returns {string}
   */
  public aesEncrypt(data: string, key: string = 'password'): string {
    const cipher = crypto.createCipher('aes192', key)
    let crypted = cipher.update(data, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  }

  /**
   * @description aes algorithm decrypt
   * @param {string} encrypted
   * @param {string} key
   * @returns {string}
   */
  public aesDecrypt (encrypted: string, key: string = 'password'): string {
    const decipher = crypto.createDecipher('aes192', key)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

}

export const crypted = new CryptoUtils()

export default CryptoUtils