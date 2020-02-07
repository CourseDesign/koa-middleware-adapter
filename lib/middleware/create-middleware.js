const defaultHandler = require('../handler');

function createMiddleware(func, {
  parameters, response, handlers, statusCode,
}) {
  const localHandler = Object.assign({}, defaultHandler, handlers || {});

  const responseInjectionHandlerOptions = {};
  if (statusCode) responseInjectionHandlerOptions.statusCode = statusCode;
  if (response) responseInjectionHandlerOptions.response = response;

  return async (ctx, next) => {
    let success = true;
    try {
      const parameter = await localHandler.parameterExtractionHandler(ctx, parameters);
      const result = await func(parameter);
      await localHandler.responseInjectionHandler(ctx, result, responseInjectionHandlerOptions);
    } catch (e) {
      success = false;
      await localHandler.errorHandler(ctx, e);
    }

    if (success) await next();
  };
}

module.exports = createMiddleware;
