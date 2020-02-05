const httpAdapter = require('simple-http-adapter');
const extractor = require('koa-params-extractor');

function createAdapter(func, option = {}) {
  const {
    property, bindContext, handlers, statusCode,
  } = option;
  const httpFunction = httpAdapter.convert({ successStatusCode: statusCode }, func, handlers);

  return async (ctx, next) => {
    const request = extractor.extract(ctx, property);
    const response = await httpFunction(request);

    if (response.statusCode >= 400 && response.statusCode < 600) {
      ctx.response.status = response.statusCode;
      ctx.response.body = response.body;
      ctx.response.headers = response.headers;

      return;
    }

    if (!bindContext) {
      ctx.response.status = response.statusCode;
      ctx.response.body = response.body;
      ctx.response.headers = response.headers;
    } else {
      Object.assign(ctx, response.body);
    }

    await next();
  };
}

module.exports = createAdapter;
