import { ParameterizedContext } from 'koa'
import AbstractResponse from 'abstract/response'
import { models } from 'mysql/index'
import { Controller, get, post, del, catchError, body, auth, query } from 'decorator/controller'

const { Article, User, Label } = models

@Controller('/article')
export default class ArticleController extends AbstractResponse {
  /**
   * @swagger
   * /article/add:
   *   post:
   *     tags: [文章模块]
   *     summary: 新增文章
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: labelId
   *       - name: sortId
   *       - name: title
   *       - name: cover
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
  async add (ctx: ParameterizedContext) {
    const params = ctx.request.body
    if (ctx?.jwtAuthInfo?.id) {
      super.authorization(ctx)
      return
    }
    const res = await Article.create({
      user_id: ctx?.jwtAuthInfo?.id,
      label_id: params.labelId,
      sort_id: params.sortId,
      title: params.title,
      cover: params.cover,
      content: params.content,
    })
    super.success(ctx, res)
  }

  /**
   * @swagger
   * /article/update:
   *   post:
   *     tags: [文章模块]
   *     summary: 更新文章信息
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *       - name: labelId
   *       - name: sortId
   *       - name: title
   *       - name: cover
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
  async update (ctx: ParameterizedContext) {
    const params = ctx.request.body
    const res = await Article.update({
      label_id: params.labelId,
      sort_id: params.sortId,
      title: params.title,
      cover: params.cover,
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
   * /article/remove:
   *   delete:
   *     tags: [文章模块]
   *     summary: 删除文章
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
  async remove (ctx: ParameterizedContext) {
    const params = ctx.request.body
    await Article.update({
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
   * /article/get:
   *   get:
   *     tags: [文章模块]
   *     summary: 获取文章信息
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
  async get (ctx: ParameterizedContext) {
    const params = ctx.request.query
    const res: any = await Article.findByPk(params.id, {
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Label,
        attributes: ['id', 'name'],
      }]
    })
    // add view count
    res?.increment('view_count')
    super.success(ctx, res, '获取详情成功')
  }

  /**
   * @swagger
   * /article/list:
   *   get:
   *     tags: [文章模块]
   *     summary: 获取文章列表
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
    const res = await Article.findAll({
      attributes: ['id', 'cover', 'updatedAt', 'title', 'label_id'],
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
   * /article/like:
   *   put:
   *     tags: [文章模块]
   *     summary: 文章点赞
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *       - name: dislike
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
  @post('/like')
  @body({
    id: {
      required: true
    }
  })
  @catchError()
  async like (ctx: ParameterizedContext) {
    const params = ctx.request.body
    const instance: any = await Article.findByPk(params.id)
    const res = await instance?.increment('like_count', {
      by: Boolean(params?.dislike) ? -1 : 1
    })
    super.success(ctx, res, '点赞成功')
  }

  /**
   * @swagger
   * /article/comment:
   *   post:
   *     tags: [文章模块]
   *     summary: 文章评论
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
  async comment (ctx: ParameterizedContext) {
    const params = ctx.request.body
    super.success(ctx, null, '评论成功')
  }

}