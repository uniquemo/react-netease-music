import Koa from 'koa'
import Router from '@koa/router'

const port = process.env.PORT || 3000
const app = new Koa()
const router = new Router()

app.use(router.routes()).use(router.allowedMethods())

app.use((ctx, next) => {
  ctx.body = 'success'
})

app.listen(port, () => {
  console.log(`SSR Server is listening on port ${port}`)
})
