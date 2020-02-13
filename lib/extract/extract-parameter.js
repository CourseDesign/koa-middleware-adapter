const extractWhere = require('./extract-where');
const extractValue = require('./extract-value');
const ParameterIsUndefined = require('../error/parameter-is-undefined');

function extractParameter(parameter, ctx) {
  if (parameter === null || parameter === undefined || typeof parameter !== 'object') {
    throw new ParameterIsUndefined();
  }
  const param = extractWhere(ctx, parameter.where);

  return parameter.name ? extractValue(param, parameter.name) : param;
}

module.exports = extractParameter;
