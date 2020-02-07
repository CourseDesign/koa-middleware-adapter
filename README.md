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

router.post('/user', adapter.create(signUp, { statusCode: 200 }));
```

```shell
Response { statusCode: 403, headers: {}, body: { message: 'Forbidden'} }
Response { statusCode: 200, headers: {}, body: { message: 'success'} }
```

​    

## Spec

### Convert

```js
adapter.create(func, options = { statusCode, parameters, bind, handlers });
```

​    

### Status Code

- Return status code if function finish success

​    

### Parameters

```js
function Parameter(
  where = new Where(null, true, true, true),
  options = { name: null, combineLevel: 0, as: null }
) {
  this.where = where;
  this.name = options.name;
  this.combineLevel = options.combineLevel;
  this.as = options.as;
}

function Where(name, koaRequest, nodeRequest, global) {
  this.name = name;
  this.koaRequest = koaRequest;
  this.nodeRequest = nodeRequest;
  this.global = global;
}
```

- This option is a property of the argument to extract, which defines the name and location of the argument to extract.
-  The default value is params, query, header, body, cookies defined

​    

### Bind

```js
function Bind({ name, where, options }) {
  this.name = name;
  this.where = where;
  this.options = options;
}
```

- This option specifies where the response will be bind to ctx.
- The default value is `body`, which binds the request value to the body of the response.
- Another predefined option is `headers`, which binds the request value to the headers of the response.
-  Another predefined option is `context`, which binds the request value to the ctx.
-  Another predefined option is `cookies`, which binds the request value to the cookies.
- The other option sets the response to `ctx[bind.name]`.

​    

### Handlers

```js
const handlers = { errorHandler, requestParamsExtract, responseMapping, responseBind };
```

​    

#### Error Handel

```js
function errorHandler(error) {}
```

#### Request Params Extract

```js
function requestParamsExtract(request) {}
```

#### Response Mapping

```js
function responseMapping(response, successStatusCode) {}
```

#### Response Bind

```js
function responseBind(ctx, bind, response) {
  return false || true;
}
```

