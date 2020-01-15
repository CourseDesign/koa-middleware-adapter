const httpAdapter = require('simple-http-adapter');
const extractor = require('koa-params-extractor');

function createAdapter(successStatusCode, func, handlers = {}) {
  const httpFunction = httpAdapter.convert({successStatusCode}, func, handlers);

  return async (ctx, next) => {
    const request = extractor.extract(ctx);
    const response = await httpFunction(request);

    ctx.response.status = response.statusCode;
    ctx.response.body = response.body;
    ctx.response.headers = response.headers;

    await next();
  };
}

module.exports = createAdapter;
