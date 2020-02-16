const Where = require('../where/where');
const WhereIsUndefined = require('../error/where-is-undefined');
const convertInjectPosition = require('../inject/convert-inject-position');

function extractInjectPosition(ctx, where) {
  if (where === null || where === undefined) {
    throw new WhereIsUndefined();
  }

  const whereIsNotCustom = where instanceof Where;

  let found;
  if (whereIsNotCustom) {
    if (where.context) {
      found = convertInjectPosition(ctx, where.name, where.setterAndGetter);
    } else if (where.koa) {
      found = convertInjectPosition(ctx.response, where.name, where.setterAndGetter);
    } else if (where.node) {
      found = convertInjectPosition(ctx.res, where.name, where.setterAndGetter);
    }
  } else if (typeof where === 'function') {
    found = convertInjectPosition(where(ctx));
  } else {
    found = convertInjectPosition(where);
  }

  return found;
}

module.exports = extractInjectPosition;
