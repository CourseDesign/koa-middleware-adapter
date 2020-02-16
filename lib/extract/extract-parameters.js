const parameter = require('../parameter');
const isExtractMany = require('./is-extract-many');
const extractOne = require('./extract-one');
const extractMany = require('./extract-many');

function extractParameters(ctx, parameters = [
  parameter.headers, parameter.params, parameter.query, parameter.body,
]) {
  if (!isExtractMany(parameters)) return [extractOne(ctx, parameters)];
  return extractMany(ctx, parameters);
}

module.exports = extractParameters;
