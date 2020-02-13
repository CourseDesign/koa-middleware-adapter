const body = require('../response/body');
const extractWhere = require('../extract/extract-where');
const injectValue = require('./inject-value');
const isPureObject = require('../util/is-pure-object');

function injectResponse(ctx, result, { response = body, status }) {
  ctx.response.status = status;

  const where = extractWhere(ctx, response.where);

  if (response.name) {
    injectValue(where.context, response.name, result);
  } else {
    const { context } = where;
    if (typeof result === 'object' && typeof context === 'object') {
      if (isPureObject(context)) {
        where.context = Object.assign(result, context);
      } else if (isPureObject(result)) {
        where.context = Object.assign(context, result);
      } else {
        where.context = { ...result, ...context };
      }
    } else where.context = result;
  }
}

module.exports = injectResponse;
