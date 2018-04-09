const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const pkg = require('./package.json')

const cwd = process.cwd()

const config =  {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: process.env.NODE_ENV === 'production' ? [
      path.resolve(cwd, 'src/index.jsx')
    ]: [
      'webpack-hot-middleware/client',
      path.resolve(cwd, 'src/index.jsx')
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].[hash].js' : '[name].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? '[id].[hash].js' : '[id].js'
  },
  resolve: {
    modules: [path.resolve(cwd, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.less']
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        },
        'postcss-loader',
        'less-loader'
      ]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(cwd, 'src/index.ejs'),
      title: `${pkg.name} - ${pkg.description}`,
      hash: false,
      inject: true,
      minify: {
        collapseWhitespace: process.env.NODE_ENV === 'production',
        minifyJS: process.env.NODE_ENV === 'production'
      }
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(cwd, 'src/static')
    }], {
      ignore: ['README.md']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      }
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
