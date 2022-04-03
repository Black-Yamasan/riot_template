const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const glob = require('glob');
const CopyPlugin = require("copy-webpack-plugin");
const minimist = require('minimist');

const entries = {};
const config = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};
const options = minimist(process.argv.slice(2), config);
const isProd = (options.env === 'prod');
const modeValue = ( isProd ) ? 'production' : 'development';
const outputDirectoryName = isProd ? 'htdocs' : 'dist';

glob.sync('./src/**/*.js', {
  ignore: './src/**/_*.js'
}).map(function (file) {
  const regExp = new RegExp(`./src/js/`);
  const key = file.replace(regExp, `./assets/js/`);
  entries[key] = [file];
});

module.exports = {
  entry: entries,
  mode: modeValue,
  output: {
    path: path.resolve(__dirname, `${outputDirectoryName}`),
    filename: '[name]'
  },
  devtool: !isProd ? 'inline-source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, outputDirectoryName),
    },
    watchFiles: ['./src/**/*', `./${outputDirectoryName}/**/*`],
    compress: isProd,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js|riot$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env']
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
      test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: false,
              sourcemap: !isProd ? 'inline-source-map' : false,
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: !isProd,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('cssnano')({
                    autoprefixer: false
                  })
                ]
              },
              sourceMap: !isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
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
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `./src/html/**/*.html`),
          context: path.resolve(__dirname, 'src', 'html'),
          to: path.resolve(__dirname, `${outputDirectoryName}/`)
        }
      ],
    })
  ],
  resolve: {
    extensions: ['.js', '.riot'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
}
