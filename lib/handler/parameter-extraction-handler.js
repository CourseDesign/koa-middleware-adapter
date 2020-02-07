const extractor = require('koa-params-extractor');

function parameterExtractionHandler(ctx, parameters) {
  return extractor.extract(ctx, parameters);
}

module.exports = parameterExtractionHandler;
