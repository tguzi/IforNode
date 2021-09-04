import path from 'path'
import fs from 'fs'
import os from 'os'
import { IAnyKey } from 'types'

/**
 * 导出目录文件
 * @export
 * @param {string} dir
 * @param {RegExp} [pattern]
 * @returns {Object}
 */
export function exportFile (dir: string, pattern?: RegExp): Object {
  let result: IAnyKey = {}
  try {
    const baseDir = path.resolve(__dirname, `../${dir}`)
    const files = fs.readdirSync(baseDir, { withFileTypes: true })
    files.forEach((file) => {
      const filepath = path.join(baseDir, file.name)
      const key = file.name.replace('.ts', '')
      const isAccord = !pattern || (pattern && pattern.test(filepath))
      // This is not the target file
      if (!isAccord) {
        return
      }
      if (file.isFile()) {
        result[key] = require(filepath)
      } else if (file.isDirectory()) {
        const res = exportFile(filepath, pattern)
        result = Object.assign(result, res)
      }
    })
  } catch (e) {
    console.error(e)
  }
  return result
}

/**
 * get js variable type
 * @export
 * @param {*} value
 * @param {boolean} [isUpperCase=false]
 * @returns {string}
 */
export function getVariableType (value: any, isUpperCase: boolean = false): string {
  const str = Object.prototype.toString.call(value)
  const patternArr =  str.match(/[^\s]\w+(?=\])/)
  const type = patternArr && patternArr[0] ? patternArr[0] : ''
  return isUpperCase ? type.toUpperCase() : type.toLowerCase()
}

/**
 * check variable is js basics data type
 * @export
 * @param {*} val
 * @returns {boolean}
 */
export function isBaseVarType (val: any): boolean {
  return ['boolean', 'number', 'string'].includes(val)
}

/**
 * is null variable
 * @export
 * @param {*} val
 * @returns {boolean}
 */
export function isNull (val: any): boolean {
  return !val && val !== 0 && (typeof val !== 'boolean' ? true : false)
}

/**
 * get local ip address
 * @export
 * @returns 
 */
export function getLocalIp() {
  const ifaces = os.networkInterfaces()
  let ip = 'localhost'
  for (const dev in ifaces) {
    if (dev === 'en0') {
      const iface = ifaces[dev]
      const len = iface?.length ?? 0
      for (let j = 0; j < len; j++) {
        if (iface && iface[j].family === 'IPv4') {
          ip = iface[j].address
          break
        }
      }
    }
  }
  return ip
}

