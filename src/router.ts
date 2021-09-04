import Router from 'koa-router'
import createDOC from 'utils/createSwaggerDoc'

const router = new Router()

// 生成swagger文档内容
router.get('/docs/swagger.json', async (ctx) => {
  ctx.set('Content-Type', 'application/json')
  ctx.body = createDOC(ctx)
})

export default router