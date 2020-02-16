const extractParameters = require('../extract/extract-parameters');

function extractParameterHandler(ctx, parameters) {
  return extractParameters(ctx, parameters);
}

module.exports = extractParameterHandler;
