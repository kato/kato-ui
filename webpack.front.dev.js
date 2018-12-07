const merge = require('webpack-merge');
const base = require('./webpack.front.base');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      _DEV_: true
    })
  ]
});
