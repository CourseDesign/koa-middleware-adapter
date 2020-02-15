# Koa Middleware Adapter

![](https://img.shields.io/npm/dm/koa-middleware-adapter.png?style=flat-square)

**Functions and promises can be used as middleware in koa.**

​    

```js
const Koa = require('koa');
const adapter = require('koa-middleware-adapter');

const app = new Koa();

app.use(adapter.create(() => 'Hello, World!'));

const port = 4000;
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
```

​    

## Document

- [example](https://github.com/kdPark0723/koa-middleware-adapter/example)
- [source](https://github.com/kdPark0723/koa-middleware-adapter)

​    


## Install

```shell
$ npm i koa-middleware-adapter
```

​    

## Usage

```js
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const adapter = require('koa-middleware-adapter');

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
```

### Request

- POST http://localhost:4000/user

  ```json
  {
  	"username": "test",
  	"password": "test"
  }
  ```

#### Response

- status: 200

  ```json
  {
      "username": "test",
      "password": "test",
      "id": 1
  }
  ```

### Request

- GET http://localhost:4000/users/0

#### Response

- status: 200

  ```json
  {
      "username": "test",
      "password": "test",
      "id": 1
  }
  ```

​    

## Spec

### Adapt

```js
adapter.create(listener, { status, type, parameters, response, handlers });
```

​    

### Parameters

```js
function Parameter(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = where;
  this.name = options.name || null;
  this.as = options.as || null;
  this.index = options.index || 0;
  this.combineLevel = options.combineLevel || 0;
}
```

- Parameters defines the information of the parameters to pass.
  - `where` defines where to find the parameter.
    - If `where` is not an instance of `Where`, the parameter is `where` .
    - If `where` is an instance of `Where`, the parameter is found in `ctx` with information from `where`.
  - `name` is the name of the parameter.
    - If `name` exists, the same name is taken from the parameter's location.
  - `combineLevel` is the level at which the imported arguments are to be combined.
    - `0` means the imported parameter is the parameter to pass.
    - `1` means the imported parameter is a child of the parameter to pass.
  - `as` specifies a name when passing a parameter.
  - `index` is index of the parameter to pass.

- The default value is `params`, `query`, `header`, `body`, `cookies` defined.

​    

### Response

```js
function Response(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = where;
  this.name = options.name || null;
  this.type = options.type;
}
```

- The response determines how to handle the lister's response
  - `where` defines where to bind the response.
    - If `where` is not an instance of `Where`, the response is injected in `where` .
    - If `where` is an instance of `Where`, the position is found in `ctx` with information from `where` and inject the response.
  - `name` is the name of the response.
    - If `name` exists, the same name is defined in the position to inject the response.
- The default value is `body`, which binds the request value to the body of the response.

​    

### Where

```js
function Where(name, context, koa, node, setterAndGetter) {
  this.name = name;
  this.context = context;
  this.koa = koa;
  this.node = node;
  this.setterAndGetter = setterAndGetter;
}
```

- Where defines where to find the parameter.
  - `name` is the name of the location from which to retrieve the parameter.
  - `context` means to find the location of a parameter in `ctx`.
  - `koa` means to find the location of a parameter in `ctx.request`.
  - `node` means to find the location of a parameter in `ctx.req`.
- `setterAndGetter` means to use `set` or `get` method to extract or inject object, if `set` or `get` method is exist.
  
  

### Handlers

```js
const handlers = { extractParameterHandler, injectResponseHandler, errorHandler };
```

#### Extract Parameter Handler

```js
function extractParameterHandler(ctx, parameters) {}
```

#### Inject Response Handler

```js
function injectResponseHandler(ctx, result, options = { response, status, type }) {}
```

#### Error Handler

```js
function errorHandler(ctx, error) {}
```

