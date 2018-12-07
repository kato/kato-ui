const merge = require('webpack-merge');
const base = require('./webpack.backend.base');
const webpack = require('webpack');
const NodemonWebpackPlugin = require('nodemon-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  entry: {
    index: './example/index.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      _DEV_: true
    }),
    new NodemonWebpackPlugin({
      nodeArgs: ['--inspect']
    })
  ]
});
