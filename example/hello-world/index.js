// eslint-disable-next-line import/no-extraneous-dependencies
const Koa = require('koa');
const middlewareAdapter = require('../koa-middleware-adapter');

function helloWorld() {
  return 'Hello, World!';
}

const app = new Koa();

app.use(middlewareAdapter.create(helloWorld));

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('server is listening to port 4000');
});
