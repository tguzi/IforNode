import { ParameterizedContext } from 'koa'
import AbstractResponse from 'abstract/response'
import { models } from 'mysql/index'
import EventEmmiter from 'events'
import { Controller, get, post, del, catchError, body, auth, query } from 'decorator/controller'

const { Note, User, Label } = models

@Controller('/note')
class NoteController extends AbstractResponse {
  /**
   * @swagger
   * /Note/add:
   *   post:
   *     tags: [札记模块]
   *     summary: 新增札记
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: labelId
   *       - name: title
   *       - name: content
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
    labelId: {
      required: true
    },
    title: {
      required: true,
      rule: /^[^\n\r\u2028\u2029]{2,32}$/
    }
  })
  @catchError()
  async add(ctx: ParameterizedContext) {
    const params = ctx.request.body
    if (ctx?.jwtAuthInfo?.id) {
      super.authorization(ctx)
      return
    }
    const res = await Note.create({
      user_id: ctx?.jwtAuthInfo?.id,
      label_id: params.labelId,
      title: params.title,
      content: params.content,
    })
    super.success(ctx, res)
  }

  /**
   * @swagger
   * /Note/update:
   *   post:
   *     tags: [札记模块]
   *     summary: 更新札记信息
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *       - name: labelId
   *       - name: title
   *       - name: content
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
    id: {
      required: true,
    }
  })
  @catchError()
  async update(ctx: ParameterizedContext) {
    const params = ctx.request.body
    const res = await Note.update({
      label_id: params.labelId,
      title: params.title,
      content: params.content,
    }, {
      where: {
        id: params.id,
        user_id: ctx?.jwtAuthInfo?.id
      }
    })
    super.success(ctx, res, '更新成功')
  }

  /**
   * @swagger
   * /Note/remove:
   *   delete:
   *     tags: [札记模块]
   *     summary: 删除札记
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
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
  @del()
  @auth
  @body({
    id: {
      required: true
    }
  })
  @catchError()
  async remove(ctx: ParameterizedContext) {
    const params = ctx.request.body
    await Note.update({
      status: 'deleted'
    }, {
      where: {
        id: params.id,
        user_id: ctx.jwtAuthInfo.id
      }
    })
    super.success(ctx, '删除成功')
  }

  /**
   * @swagger
   * /Note/get:
   *   get:
   *     tags: [札记模块]
   *     summary: 获取札记信息
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
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
  @get()
  @query({
    id: {
      required: true
    }
  })
  @catchError()
  async get(ctx: ParameterizedContext) {
    const params = ctx.request.query
    const res: any = await Note.findByPk(params.id, {
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Label,
        attributes: ['id', 'name'],
      }]
    })
    super.success(ctx, res, '获取详情成功')
  }

  /**
   * @swagger
   * /Note/list:
   *   get:
   *     tags: [札记模块]
   *     summary: 获取札记列表
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: page
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
  @get()
  @catchError()
  async list(ctx: ParameterizedContext) {
    const res = await Note.findAll({
      attributes: ['id', 'updatedAt', 'title', 'label_id'],
      include: [
        {
          model: Label,
          attributes: ['name', 'id'],
        }
      ]
    })
    super.success(ctx, res)
  }

  /**
   * @swagger
   * /Note/comment:
   *   post:
   *     tags: [札记模块]
   *     summary: 札记评论
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
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
  @body({
    id: {
      required: true
    }
  })
  @catchError()
  async comment(ctx: ParameterizedContext) {
    const params = ctx.request.body
    super.success(ctx, null, '评论成功')
  }

}