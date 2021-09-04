import { ParameterizedContext } from 'koa'
import { Controller, get, post, catchError, body, auth, put } from 'decorator/controller'
import AbstractResponse from 'abstract/response'
import { models } from 'mysql/index'
import { crypted } from 'utils/crypto'
import { jwtSign } from 'middleware/authorization'

const { User } = models

@Controller('/user')
class UserController extends AbstractResponse {
  /**
   * @swagger
   * /user/login:
   *   post:
   *     tags: [用户模块]
   *     summary: 用户登录 - 自动发布测试
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: nickname
   *       - name: password
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
    nickname: {
      required: true
    },
    password: {
      required: true
    }
  })
  @catchError()
  async login (ctx: ParameterizedContext) {
    const params = ctx.request.body
    const res = await User?.findOne({
      where: {
        nickname: params.nickname,
        password: crypted.md5(params.password)
      }
    })
    if (res) {
      const userInfo: any = res.toJSON()
      userInfo['token'] = jwtSign({ id: userInfo.id })
      super.success(ctx, userInfo, '登录成功')
    } else {
      super.error(ctx, '用户名或者密码出错！')
    }
  }

  /**
   * @swagger
   * /user/registry:
   *   post:
   *     tags: [用户模块]
   *     summary: 注册用户
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: nickname
   *       - name: password
   *       - name: avatar
   *       - name: email
   *       - name: age
   *       - name: phone
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
    nickname: {
      required: true
    },
    password: {
      required: true
    }
  })
  @catchError()
  async registry (ctx: ParameterizedContext) {
    const params = ctx.request.body
    console.log('--------', ctx.ip, ctx.request.ip)
    const res = await User.create({
      nickname: params.nickname,
      password: crypted.md5(params.password),
      ip: '::ffff:183.195.15.111',
      avatar: params.avatar,
      email: params.email,
      age: params.age,
      phone: params.phone,
    })
    super.success(ctx, res)
  }

  /**
   * @swagger
   * /user/getCurrentUserInfo:
   *   get:
   *     tags: [用户模块]
   *     summary: 获取当前用户信息
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
   *              type: object
   *              properties:
   */
  @get()
  @auth
  async getCurrentUserInfo (ctx: ParameterizedContext) {
    const userInfo = await User.findByPk(ctx.jwtAuthInfo.id)
    super.success(ctx, userInfo)
  }

  /**
   * @swagger
   * /user/updateCurrentUserInfo:
   *   put:
   *     tags: [用户模块]
   *     summary: 修改当前用户信息
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: avatar
   *       - name: email
   *       - name: age
   *       - name: phone
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
  async updateCurrentUserInfo (ctx: ParameterizedContext) {
    const params = ctx.request.body
    await User.update({
      avatar: params.avatar,
      email: params.email,
      age: params.age,
      phone: params.phone,
    }, {
      where: {
        id: ctx.jwtAuthInfo.id
      }
    })
    super.success(ctx, '更新用户信息成功')
  }
}