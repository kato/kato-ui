import ecstatic from 'ecstatic';
import path from 'path';

const file = ecstatic({
  root: path.join(__dirname, '..', 'ui'),
  baseDir: '/ui/',
  autoIndex: true
});

export async function KatoUI({req, res}, next) {
  if (req.url.startsWith('/ui/')) {
    file(req, res);
  } else
    await next();

}
