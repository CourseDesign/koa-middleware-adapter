const injectResponse = require('../inject/inject-response');

function injectResponseHandler(ctx, result, options) {
  return injectResponse(ctx, result, options);
}

module.exports = injectResponseHandler;
