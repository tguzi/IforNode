import { ParameterizedContext } from 'koa'
import { Controller, get, post, catchError, body, auth, put } from 'decorator/controller'
import AbstractResponse from 'abstract/response'
import { models } from 'mysql/index'

const { Label } = models

@Controller('/label')
class LabelController extends AbstractResponse {
  /**
   * @swagger
   * /label/add:
   *   post:
   *     tags: [标签模块]
   *     summary: 新增标签
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *       - name: alias
   *       - name: description
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
   *              type: object
   *              properties:
   */
  @post()
  @auth
  @body({
   name: {
     required: true
   }
  })
  @catchError()
  async add (ctx: ParameterizedContext) {
    const params = ctx.request.body
    const res = await Label.create({
      name: params.name,
      alias: params.alias,
      description: params.description,
    })
    super.success(ctx, res)
  }

  /**
   * @swagger
   * /label/update:
   *   put:
   *     tags: [标签模块]
   *     summary: 更新标签
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *       - name: name
   *       - name: alias
   *       - name: description
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
   *              type: object
   *              properties:
   */
  @put()
  @auth
  @body({
    id: {
      required: true
    }
  })
  async update (ctx: ParameterizedContext) {
    const params = ctx.request.body
    const res = await Label.update({
      name: params.name,
      alias: params.alias,
      description: params.description,
    }, {
      where: {
        id: params.id
      }
    })
    super.success(ctx, res, '更新成功')
  }
}