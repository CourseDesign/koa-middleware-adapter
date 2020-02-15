const defaultHandler = require('../handler');

function createMiddleware(listener, options = {}) {
  const localHandler = { ...defaultHandler, ...options.handlers || {} };

  return async (ctx, next) => {
    try {
      const extractedParameters = await localHandler.extractParameterHandler(
        ctx, options.parameters,
      );
      const result = await listener(...extractedParameters);
      await localHandler.injectResponseHandler(ctx, result, {
        response: options.response, status: options.status, type: options.type,
      });
      await next();
    } catch (error) {
      await localHandler.errorHandler(ctx, error);
    }
  };
}

module.exports = createMiddleware;
