const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const dist = path.join(__dirname, 'dist', 'middleware');

module.exports = {
  entry: {
    index: './middleware/index.js'
  },
  output: {
    path: dist,
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                node: '8'
              }
            }]]
          }
        }
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(dist)
  ]
};
