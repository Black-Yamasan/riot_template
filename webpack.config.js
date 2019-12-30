const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'riotApp.js'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [{
          loader: 'riot-tag-loader',
          options: {
            hot: false,
            sourcemap: false
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ riot: 'riot' })
  ]
};
