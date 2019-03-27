// apply NODE_ENV first
process.env.NODE_ENV = 'development'

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')

const compiler = webpack(webpackConfig)

const { devServer: devServerConfig } = webpackConfig

const devServer = new WebpackDevServer(compiler, devServerConfig)

const { port, host } = devServerConfig

devServer.listen(port, host, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
