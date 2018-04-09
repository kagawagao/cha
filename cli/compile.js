// apply NODE_ENV first
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackConfig = require('../webpack.config')

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.error(err)
  }

  const jsonStats = stats.toJson()

  console.dir(jsonStats)
})
