const injection = require('koa-response-injection');
const InternalServerError = require('../error/internal-server-error');

function responseInjectionHandler(ctx, result, options) {
  try {
    return injection.inject(ctx, result, options);
  } catch (e) {
    throw new InternalServerError(e.message);
  }
}

module.exports = responseInjectionHandler;
