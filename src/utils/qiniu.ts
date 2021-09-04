import qiniu from 'qiniu'
import config from 'config/index'

const { BUCKET, EXPIRES, ACCESS_KEY, SECRET_KEY } = config?.QINIU_CONFIG

class QiniuTools {
  getUploadToken() {
    const options = {
      scope: BUCKET,
      expires: EXPIRES
    }
    const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return {
      token: uploadToken,
      domain: 'http://qdn.dripflows.cn/'
    }
  }
}

export const qiniuTool = new QiniuTools()

export const getUploadToken = qiniuTool.getUploadToken

export default QiniuTools

