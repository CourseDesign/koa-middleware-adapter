const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const bodyParser = require('koa-bodyparser');

const adapter = require('../lib');

const app = new Koa();
const router = new Router();

function signUp({ username, password }) {
  if (!username || !password) throw new adapter.Forbidden();

  // Business logic
  // ...

  return { message: 'success' };
}

router.post('/user', adapter.create(signUp, { statusCode: 200, bind: { where: 'context' } }));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

const localhost = axios.create({
  baseURL: 'http://localhost:3000',
});

async function test() {
  const success = await localhost.post('/user', {
    username: 'Test User',
    password: 'test',
  });

  // eslint-disable-next-line no-console
  console.log(success);

  const fail = await localhost.post('/user', {
    username: 'Test User',
  });

  // eslint-disable-next-line no-console
  console.log(fail);
}

test().then(
  (res) => {
    // eslint-disable-next-line no-console
    console.log(res);
  },
  (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  },
);
