const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { argv } = require('yargs')

const pkg = require('./package.json')

const cwd = process.cwd()

// generate css loader for specific lang
function getCSSLoader (lang) {
  let loaders = []
  if (process.env.NODE_ENV === 'development') {
    loaders = [{
      loader: 'style-loader',
      options: {
        sourceMap: true
      }
    }]
  } else {
    loaders = [MiniCSSExtractPlugin.loader]
  }
  loaders = [
    ...loaders,
    {
      loader: 'css-loader',
      options: {
        importLoaders: lang === 'css' ? 1 : 2,
        minimize: process.env.NODE_ENV === 'production',
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
  if (lang === 'less') {
    loaders.push({
      loader: 'less-loader',
      options: {
        sourceMap: true
      }
    })
  }
  return loaders
}

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: process.env.NODE_ENV === 'production' ? [
      path.resolve(cwd, 'polyfills/index.js'),
      path.resolve(cwd, 'src/index.jsx')
    ] : [
      'webpack-dev-server/client', // for HMR
      'webpack/hot/dev-server', // for HMR
      path.resolve(cwd, 'polyfills/index.js'),
      path.resolve(cwd, 'src/index.jsx')
    ]
  },
  output: {
    publicPath: '/',
    path: path.resolve(cwd, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? '[id].[contenthash].js' : '[id].js'
  },
  resolve: {
    modules: [path.resolve(cwd, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.less']
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    publicPath: '/',
    quiet: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true,
    useLocalIp: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      entrypoints: false,
      children: false,
      version: false,
      assets: false
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /.css$/,
        use: getCSSLoader('css')
      },
      {
        test: /.less$/,
        use: getCSSLoader('less')
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
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
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(cwd, 'src/static')
        }
      ],
      {
        ignore: ['README.md']
      }
    ),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      }
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: process.env.NODE_ENV === 'development' ? [
          `Application is running at http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT || 3000}`
        ] : null
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    assetFilter: (assetFilename) => assetFilename.endsWith('.js')
  }
}

if (process.env.NODE_ENV === 'development') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  )

  if (argv.ana) {
    // bundle analyzer
    config.plugins.push(
      new BundleAnalyzerPlugin({
        generateStatsFile: true
      })
    )
  }

  // config.optimization.splitChunks.cacheGroups = {
  //   styles: {
  //     name: 'styles',
  //     test: /\.css$/,
  //     chunks: 'all',
  //     enforce: true
  //   }
  // }
  config.optimization.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    })
  ]
}

module.exports = config
