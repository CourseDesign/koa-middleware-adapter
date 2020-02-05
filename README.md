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
adapter.create(successStatusCode, func, options = { statusCode, property, bindContext, handlers });
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

### Bind Context

- This option determines whether the response is appended to ctx, if true, then bound to ctx instead of binding to response. 
- The default value is false

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
