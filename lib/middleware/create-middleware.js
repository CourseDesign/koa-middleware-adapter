const defaultHandler = require('../handler');

function createMiddleware(func, options = {}) {
  const localHandler = { ...defaultHandler, ...options.handlers || {} };

  return async (ctx, next) => {
    try {
      const extractedParameters = await localHandler.extractParameterHandler(
        ctx, options.parameters,
      );
      const result = await func(...extractedParameters);
      await localHandler.injectResponseHandler(ctx, result, {
        response: options.response, status: options.status,
      });
      await next();
    } catch (error) {
      await localHandler.errorHandler(ctx, error);
    }
  };
}

module.exports = createMiddleware;
