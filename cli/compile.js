// apply NODE_ENV first
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const rimraf = require('rimraf')

// clean dist first
rimraf.sync(`${webpackConfig.output.path}/*`)

// create compiler
console.log('\nClean dist dir')
const compiler = webpack(webpackConfig)

console.log('\nCompile start')

compiler.run((err, stats) => {
  // normal error from process
  if (err) {
    console.error(err.stack || err)
    process.exit(1)
  }

  // const statsInfo = stats.toJson()

  if (stats.hasErrors()) {
    // console.error(statsInfo.errors)
    // console.log('Build failed with errors, see above\n')
  } else if (stats.hasWarnings()) {
    // console.warn(statsInfo.warnings)
    // console.log('Build success with warnings, see above\n')
  } else {
    // console.log('Compile success\n')
  }
})
