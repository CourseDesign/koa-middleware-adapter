// eslint-disable-next-line import/no-extraneous-dependencies
const Koa = require('koa');
const adapter = require('../koa-middleware-adapter');

const app = new Koa();

const middleware = adapter.create(() => {
  throw new adapter.Forbidden();
}, {
  handlers: {
    errorHandler: true,
  },
});

app.use(middleware);

app.onerror = (err) => {
  console.log('something wrong', err);
};

const port = 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening to port ${port}`);
});
