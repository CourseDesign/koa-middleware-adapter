const defaultHandler = require('../handler');

function createMiddleware(func, {
  parameters, response, handlers, statusCode,
}) {
  const localHandler = { ...defaultHandler, ...handlers || {} };

  const responseInjectionHandlerOptions = {};
  if (statusCode) responseInjectionHandlerOptions.statusCode = statusCode;
  if (response) responseInjectionHandlerOptions.response = response;

  return async (ctx, next) => {
    try {
      const arguments = await localHandler.parameterExtractionHandler(ctx, parameters);
      const result = await func(...arguments);
      if (result !== undefined) await localHandler.responseInjectionHandler(ctx, result, responseInjectionHandlerOptions);
      await next();
    } catch (e) {
      await localHandler.errorHandler(ctx, e);
    }
  };
}

module.exports = createMiddleware;
