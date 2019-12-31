const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const glob = require('glob');

const entries = {};
const minimist = require('minimist');
const config = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
}
const options = minimist(process.argv.slice(2), config);
const isProd = (options.env === 'prod');
const modeValue = ( isProd ) ? 'production' : 'development';


glob.sync('./src/**/*.js', {
  ignore: './src/**/_*.js'
}).map(function (file) {
  const regExp = new RegExp(`./src/js/`);
  const key = file.replace(regExp, 'assets/js/');
  entries[key] = [file];
});

module.exports = {
  entry: entries,
  mode: modeValue,
  target: 'node',
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name]'
  },
  devtool: !isProd ? 'inline-source-map' : false,
  module: {
    rules: [{
      test: /\.js|riot$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env']
          ]
        }
      }],
      exclude: {
        include: /node_modules/,
        exclude: /node_modules\/riot\//
      }
    },
    {
      test: /\.riot$/,
      exclude: /node_modules/,
      use: [{
        loader: '@riotjs/webpack-loader',
        options: {
          hot: false,
          sourcemap: !isProd ? 'inline-source-map' : false,
        }
      }]
    }
    ]
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          ecma: 6,
          compress: { drop_console: isProd },
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/i,
            beautify: !isProd
          }
        },
        extractComments: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    })
  ]
};