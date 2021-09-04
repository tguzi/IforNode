import { ParameterizedContext } from 'koa'
import { Controller, get, post, catchError, body, auth, put } from 'decorator/controller'
import AbstractResponse from 'abstract/response'
import { models } from 'mysql/index'

const { Sort } = models

@Controller('/sort')
class SortController extends AbstractResponse {
  /**
   * @swagger
   * /sort/add:
   *   post:
   *     tags: [分类模块]
   *     summary: 新增分类
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *       - name: alias
   *       - name: description
   *       - name: pId
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
    const res = await Sort.create({
      name: params.name,
      alias: params.alias,
      description: params.description,
      parent_id: params.pid,
    })
    super.success(ctx, res)
  }

  /**
   * @swagger
   * /sort/update:
   *   put:
   *     tags: [分类模块]
   *     summary: 更新分类
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
    await Sort.update({
      name: params.name,
      alias: params.alias,
      description: params.description,
      parent_id: params.pid,
    }, {
      where: {
        id: params.id
      }
    })
    super.success(ctx, '更新成功')
  }
}