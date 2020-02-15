// eslint-disable-next-line import/no-extraneous-dependencies
const Koa = require('koa');
const adapter = require('../koa-middleware-adapter');

const app = new Koa();

app.use(adapter.create(() => {
  throw new adapter.Forbidden();
}));

const port = 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening to port ${port}`);
});
