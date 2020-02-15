// eslint-disable-next-line import/no-extraneous-dependencies
const Koa = require('koa');
const middlewareAdapter = require('../koa-middleware-adapter');

const app = new Koa();

app.use(middlewareAdapter.create(() => '<p>Page Not Found</p>', {
  status: 404, type: 'html',
}));

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('server is listening to port 4000');
});
