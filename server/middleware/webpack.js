const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { PassThrough } = require('stream')

const devMiddleware = (compiler, opts) => {
  const middleware = webpackDevMiddleware(compiler, opts)

  return async (ctx, next) => {
    const goNext = await new Promise((resolve, reject) => {
      const req = ctx.req
      const res = {}

      res.end = content => {
        ctx.body = content
        resolve(false)
      }

      res.setHeader = (name, value) => {
        ctx.set(name, value)
      }

      middleware(req, res, () => {
        resolve(true)
      })
    })

    if (goNext) {
      await next()
    }
  }
}

const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()
    ctx.body = stream
    const req = ctx.req
    const res = {}
    res.writeHead = (status, headers) => {
      ctx.status = status
      ctx.set(headers)
    }
    res.write = stream.write.bind(stream)
    await middleware(req, res, next)
  }
}

module.exports = (app, compiler, config) => {
  app.use(devMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    publicPath: '',
    stats: 'errors-only'
  }))
  app.use(hotMiddleware(compiler, {}))
}
