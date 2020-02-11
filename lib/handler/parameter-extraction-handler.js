const extractor = require('koa-params-extractor');

function parameterExtractionHandler(ctx, parameters) {
  const request = extractor.extract(ctx, parameters);

  return extractor.isExtractMany(parameters) ? request : [request];
}

module.exports = parameterExtractionHandler;
