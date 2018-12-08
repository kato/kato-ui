import ecstatic from 'ecstatic';

let fileServer;

if (_DEV_) {
  const webpack = require('webpack');
  const compiler = webpack(require('../webpack.front.dev'));
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: 'errors-only',
    hot: true
  });
  const hotMiddleware = require('webpack-hot-middleware')(compiler);
  fileServer = (req, res) => {
    devMiddleware(req, res, () => {
      hotMiddleware(req, res, () => {
        res.writeHead(404);
        res.end('Not Found!!!')
      })
    })
  }
} else {
  fileServer = ecstatic({
    root: __dirname.substring(0, __dirname.lastIndexOf('middleware')) + 'ui',
    autoIndex: true
  })
}

export async function KatoUI({req, res}, next) {
  if (req.url.startsWith('/ui/')) {
    //裁剪url
    req.url = req.url.substr('/ui'.length, req.url.length);
    fileServer(req, res);
  } else
    await next();
}
