import ecstatic from 'ecstatic';
import upath from 'upath';

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
    root: upath.join(__dirname, '../ui'),
    autoIndex: true
  })
}

export async function KatoUI(ctx, next) {
  const {req, res} = ctx;
  if (req.url.startsWith('/ui/')) {
    //禁止respond中间件的处理,其实KatoUI肯定在respond中间件前
    ctx.bypassing = true;
    //裁剪url
    req.url = req.url.substr('/ui'.length, req.url.length);
    fileServer(req, res);
    await new Promise(resolve => {
      res.on('finish', () => resolve())
    });
  } else
    await next();
}
