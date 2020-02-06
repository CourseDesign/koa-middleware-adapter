// TODO Remove simple-http-adapter
const httpAdapter = require('simple-http-adapter');
const extractor = require('koa-params-extractor');
const defaultResponseBindHandler = require('./response-bind-handler');

function createAdapter(func, option = {}) {
  const {
    parameters, bind, handlers, statusCode,
  } = option;

  const httpFunction = httpAdapter.convert(
    { successStatusCode: statusCode || 200 },
    func, handlers,
  );

  let responseBindHandler = defaultResponseBindHandler;
  if (handlers) responseBindHandler = handlers.responseBind || responseBindHandler;

  return async (ctx, next) => {
    const request = extractor.extract(ctx, parameters);
    const response = await httpFunction(request);
    const success = await responseBindHandler(ctx, bind, response);

    if (success) await next();
  };
}

module.exports = createAdapter;
