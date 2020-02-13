const Where = require('../response/where');
const WhereIsUndefined = require('../error/where-is-undefined');
const WhereTypeIsUndefined = require('../error/where-type-is-undefined');
const isInContext = require('./is-in-context');
const extractElement = require('./extract-element');
const convertInjectPosition = require('../inject/convert-inject-position');

function extractWhere(ctx, where) {
  if (where === null || where === undefined) {
    throw new WhereIsUndefined();
  }
  if (where.type === null || where.type === undefined) {
    throw new WhereTypeIsUndefined();
  }

  const whereIsNotCustom = where instanceof Where;

  let found;
  if (where.type === 'request') {
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
  } else if (where.type === 'response') {
    if (whereIsNotCustom) {
      if (where.context && isInContext(ctx, where.name)) {
        found = convertInjectPosition(ctx, where.name);
      } else if (where.koa && isInContext(ctx.response, where.name)) {
        found = convertInjectPosition(ctx.response, where.name);
      } else if (where.node && isInContext(ctx.res, where.name)) {
        found = convertInjectPosition(ctx.res, where.name);
      }
    } else if (typeof where === 'function') {
      found = convertInjectPosition(where(ctx));
    } else {
      found = convertInjectPosition(where);
    }
  }

  return found;
}

module.exports = extractWhere;
