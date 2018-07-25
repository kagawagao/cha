const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint')({
          configFile: path.resolve(process.cwd(), './.stylelintrc')
        })
      ]
    }),
    require('postcss-url')(),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
}
