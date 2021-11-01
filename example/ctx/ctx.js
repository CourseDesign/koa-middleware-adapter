/* eslint-disable import/no-extraneous-dependencies,no-console, no-shadow */
const Koa = require('koa');
const Router = require('koa-router');
const adapter = require('../koa-middleware-adapter');

const router = new Router();

const testMiddleware = adapter.create((data) => `${data} test`, {
  status: null,
  parameters: [
    new adapter.parameter.Parameter(adapter.parameter.where.context, { index: 0, name: 'test' }),
  ],
  response: new adapter.response.Response(adapter.response.where.body),
});

router.get('/', testMiddleware);

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.test = 'hello';
  await next();
});

app.use(router.routes());

app.listen(3000);
