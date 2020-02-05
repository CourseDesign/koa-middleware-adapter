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
adapter.create(successStatusCode, func, options = { statusCode, property, bind, handlers });
```

​    

### Status Code

- Return status code if function finish success

​    

### Parameter

```js
class Property {
  constructor(name, where) {
    this.name = name;

    if (where) this.where = where;
    else this.where = new Where(false, true, true, true);
  }
}

class Where {
  constructor(destructuring, koaRequest, nodeRequest, global) {
    this.destructuring = destructuring;
    this.koaRequest = koaRequest;
    this.nodeRequest = nodeRequest;
    this.global = global;
  }
}
```

- This option is a property of the argument to extract, which defines the name and location of the argument to extract.
-  The default value is params, query, header, body defined

​    

### Bind

- This option specifies where the response will be bind to ctx.
- The default value is `response`, which binds the request value to the body of the response.
-  Another predefined option is destructuring, which destructuring the response and assign it with ctx.
- The other option sets the response to `ctx[bind]`.

​    

### Handlers

```js
const handlers = { errorHandel, requestParamsExtract, responseMapping, responseBind };
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

#### Response Bind

```js
function responseBind(ctx, bind, response) {
  return false || true;
}
```

