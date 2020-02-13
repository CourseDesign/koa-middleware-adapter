const defaultHandler = require('../handler');

function createMiddleware(func, {
  status, parameters, response, handlers,
}) {
  const localHandler = { ...defaultHandler, ...handlers || {} };

  return async (ctx, next) => {
    try {
      const extractedParameters = await localHandler.extractParameterHandler(ctx, parameters);
      const result = await func(...extractedParameters);
      await localHandler.injectResponseHandler(ctx, result, { response, status });
      await next();
    } catch (error) {
      await localHandler.errorHandler(ctx, error);
    }
  };
}

module.exports = createMiddleware;
