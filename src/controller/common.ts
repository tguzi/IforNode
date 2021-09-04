import fs from 'fs'
import path from 'path'
import { ParameterizedContext } from 'koa'
import { Controller, post, catchError, auth, get } from 'decorator/controller'
import AbstractResponse from 'abstract/response'
import { getUploadToken } from 'utils/qiniu'
import { CITEXT } from 'sequelize/types'

@Controller('/common')
class CommonController extends AbstractResponse {
  @post()
  @auth
  @catchError()
  uploadSingleFile(ctx: ParameterizedContext) {
    console.log('上传文件')
    // 上传单个文件
    const file = ctx?.request?.files?.file
    if (!file) {
      return super.error(ctx, 'cannot find file')
    }
    // const reader = fs.createReadStream(file?.path)
    // const filepath = path.join(__dirname, '../', 'public/upload/', file?.name)
    // const upStream = fs.createWriteStream(filepath)
    // reader.pipe(upStream)
    // super.success(ctx, filepath, 'upload success')
  }

/**
 * @swagger
 * /common/getUploadToken:
 *   get:
 *     tags: [公共模块]
 *     summary: 获取上传七牛云token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 操作成功
 *         schema:
 *           type: object
 *           properties:
 *            code:
 *              type: number
 *            message:
 *              type: string
 *            data:
 *              type: string
 */
  @get()
  @auth
  @catchError()
  getUploadToken(ctx: ParameterizedContext) {
    const token = getUploadToken()
    super.success(ctx, token)
  }

}