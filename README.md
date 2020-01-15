# Koa Middleware Adapter

**Normal function, promise can be used as koa middleware**.

​    

## Install

```shell
$ npm i koa-middleware-adapter
```

​    

## Usage

```js
function signUp({ username, password }) {
  if (!username || !password) throw new adapter.Forbidden();

  // Business logic
  // ...

  return { message: 'success' };
}

router.post('/user', adapter.create(200, signUp));
```

```shell
Response { statusCode: 403, headers: {}, body: { message: 'Forbidden'} }
Response { statusCode: 200, headers: {}, body: { message: 'success'} }
```

​    

## Spec

### Convert

```js
adapter.create(successStatusCode, func, handlers);
```

​    

### Handlers

```js
const handlers = { errorHandel, requestParamsExtract, responseMapping };
```

​    

#### Error Handel

```js
function errorHandel(error) {}
```

#### Request Params Extract

```js
function requestParamsExtract(request) {}
```

#### Response Mapping

```js
function responseMapping(response, successStatusCode) {}
```
