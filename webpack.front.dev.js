const merge = require('webpack-merge');
const base = require('./webpack.front.base');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/ui/__webpack_hmr&timeout=20000",
      "./ui/main.js"
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      _DEV_: true
    })
  ]
});
