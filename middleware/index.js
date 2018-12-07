import ecstatic from 'ecstatic';

const file = ecstatic({
  root: __dirname.substring(0, __dirname.lastIndexOf('middleware')) + 'ui',
  baseDir: '/ui/',
  autoIndex: true
});

export async function KatoUI({req, res}, next) {
  if (req.url.startsWith('/ui/')) {
    file(req, res);
  } else
    await next();
}
