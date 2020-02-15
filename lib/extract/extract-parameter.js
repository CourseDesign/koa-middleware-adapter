const extractContext = require('./extract-context');
const extractValue = require('./extract-value');
const ParameterIsUndefined = require('../error/parameter-is-undefined');

function extractParameter(ctx, parameter) {
  if (parameter === null || parameter === undefined || typeof parameter !== 'object') {
    throw new ParameterIsUndefined();
  }
  const context = extractContext(ctx, parameter.where);

  return parameter.name
    ? extractValue(context, parameter.name, parameter.where.setterAndGetter) : context;
}

module.exports = extractParameter;
