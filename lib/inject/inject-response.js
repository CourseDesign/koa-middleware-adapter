const body = require('../response/body');
const extractInjectPosition = require('../extract/extract-inject-position');
const injectValue = require('./inject-value');
const isPureObject = require('../util/is-pure-object');

function injectResponse(ctx, result, { response = body, status = 200, type }) {
  if (status) ctx.response.status = status;
  if (type) ctx.response.type = type;

  let resolvedResponse = response;
  if (!resolvedResponse) return;
  if (typeof response === 'function') resolvedResponse = response(ctx);
  if (result === undefined) return;

  const injectPosition = extractInjectPosition(ctx, resolvedResponse.where);

  if (resolvedResponse.name) {
    injectValue(injectPosition.context, resolvedResponse.name, result,
      resolvedResponse.where.setterAndGetter.inject);
  } else {
    const { context } = injectPosition;
    if (typeof result === 'object' && typeof context === 'object') {
      if (isPureObject(context)) {
        injectPosition.context = Object.assign(result, context);
      } else if (isPureObject(result)) {
        injectPosition.context = Object.assign(context, result);
      } else {
        injectPosition.context = { ...result, ...context };
      }
    } else injectPosition.context = result;
  }
}

module.exports = injectResponse;
