const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
require('@babel/polyfill')
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['@babel/polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: "js/[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    clientLogLevel: 'error',
    headers: {
      "Access-Control-Allow-Origin": "http://api.travelpayouts.com"
    }
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Fly booking',
      template: 'index.html',
      filename: path.resolve(__dirname, './dist/index.html'),
      favicon: path.resolve(__dirname, './public/favicon.ico')
    })
  ]
}

if (isProd) {
  module.exports.devtool = '#source-map'
  module.exports.optimization = {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        AVIASALES: `"${process.env.AVIASALES_API_ENDPOINT}"`,
        API: `"${process.env.API_ENDPOINT}"`,
        TOKEN: `"${process.env.API_TOKEN}"`,
        MARKER: `"${process.env.API_MARKER}"`
      }
    })
  ])
}
