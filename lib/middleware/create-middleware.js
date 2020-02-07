const defaultHandler = require('../handler');

function createMiddleware(func, {
  parameters, response, handlers, statusCode,
}) {
  const localHandler = Object.assign({}, defaultHandler, handlers || {});

  return async (ctx, next) => {
    let success = true;
    try {
      const parameter = await localHandler.parameterExtractionHandler(ctx, parameters);
      const result = await func(parameter);
      await localHandler.responseInjectionHandler(ctx, result, { statusCode, response });
    } catch (e) {
      success = false;
      await localHandler.errorHandler(ctx, e);
    }

    if (success) await next();
  };
}

module.exports = createMiddleware;
