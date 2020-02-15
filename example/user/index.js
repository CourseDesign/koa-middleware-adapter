/* eslint-disable import/no-extraneous-dependencies,no-console, no-shadow */
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const adapter = require('../koa-middleware-adapter');

const UserDao = require('./userDao');

const userDao = new UserDao();

async function findUserInfo(userId, userDao) {
  const user = await userDao.findById(Number(userId));
  if (!user) throw new adapter.NotFound('User Not Found');

  return user;
}

async function createUserInfo(user, userDao) {
  await userDao.insert(user);
  return user;
}

const findUserMiddleware = adapter.create(findUserInfo, {
  status: 200,
  parameters: [
    new adapter.parameter.Parameter(adapter.parameter.where.params, { name: 'userId', index: 0 }),
    new adapter.parameter.Parameter(userDao, { index: 1 }),
  ],
});

const findUserInContextMiddleware = adapter.create(findUserInfo, {
  status: 200,
  parameters: [
    new adapter.parameter.Parameter(new adapter.parameter.where.Where('user', true), { name: 'id', index: 0 }),
    new adapter.parameter.Parameter(userDao, { index: 1 }),
  ],
});

const createUserMiddleware = adapter.create(createUserInfo, {
  status: null,
  parameters: [
    new adapter.parameter.Parameter(adapter.parameter.where.body, { index: 0 }),
    new adapter.parameter.Parameter(userDao, { index: 1 }),
  ],
  response: new adapter.response.Response(adapter.response.where.context, { name: 'user' }),
});

const router = new Router();

router.get('/users/:userId', findUserMiddleware);
router.post('/user', createUserMiddleware, findUserInContextMiddleware);

const app = new Koa();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

const port = 4000;
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});

/* eslint-enable import/no-extraneous-dependencies,no-console, no-shadow */
