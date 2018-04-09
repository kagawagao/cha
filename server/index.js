const Koa = require('koa')
const convert = require('koa-convert')
const serve = require('koa-static')
const historyApiFallback = require('koa-connect-history-api-fallback')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const webpackMiddleware = require('./middleware/webpack')
const path = require('path')

const app = new Koa()

// history api fallback
app.use(convert(historyApiFallback({
  verbose: false
})))

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start

  ctx.set('X-Response-Time', `${ms}ms`)
})

const compiler = webpack(webpackConfig)

webpackMiddleware(app, compiler)

app.use(serve(path.resolve(process.cwd(), 'src/static')))

const port = process.PORT || 3000
const host = process.HOST || '0.0.0.0'

app.listen(port, host, () => {
  console.log(`Server now is running at ${host}:${port}`)
})


