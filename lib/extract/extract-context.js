const Where = require('../where').default;
const WhereIsUndefined = require('../error/where-is-undefined');
const isInContext = require('./is-in-context');
const extractElement = require('./extract-element');

function extractContext(ctx, where) {
  if (where === null || where === undefined) {
    throw new WhereIsUndefined();
  }

  const whereIsNotCustom = where instanceof Where;

  let found;
  if (whereIsNotCustom) {
    if (where.context && isInContext(ctx, where.name)) {
      found = extractElement(ctx, where.name);
    } else if (where.koa && isInContext(ctx.request, where.name)) {
      found = extractElement(ctx.request, where.name);
    } else if (where.node && isInContext(ctx.req, where.name)) {
      found = extractElement(ctx.req, where.name);
    }
  } else if (typeof where === 'function') {
    found = where(ctx);
  } else {
    found = where;
  }

  return found;
}

module.exports = extractContext;
