// eslint-disable-next-line import/no-extraneous-dependencies
const Koa = require('koa');
const middlewareAdapter = require('../koa-middleware-adapter');

const app = new Koa();

app.use(middlewareAdapter.create(() => 'Hello, World!'));

const port = 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening to port ${port}`);
});
