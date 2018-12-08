const merge = require('webpack-merge');
const base = require('./webpack.front.base');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const dist = path.join(__dirname, 'dist', 'ui');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: dist
  },
  plugins: [
    new CleanWebpackPlugin(dist),
    new webpack.DefinePlugin({
      _DEV_: false
    })
  ]
});
