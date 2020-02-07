const Response = require('../response/response');
const InternalServerError = require('../error/internal-server-error');

const defaultOptions = {
  statusCode: 200,
  response: new Response({ where: 'body' }),
};

function responseInjectionHandler(ctx, result, options = {}) {
  const localOptions = { ...defaultOptions, ...options };
  const { statusCode, response } = localOptions;

  ctx.response.status = statusCode;

  if (response.where === 'body') {
    if (response.name) {
      if (typeof ctx.response.body !== 'object') ctx.response.body = {};
      ctx.response.body[response.name] = result;
    } else ctx.response.body = result;
  } else if (response.where === 'headers') {
    if (response.name) ctx.set(response.name, result);
    else ctx.set(result);
  } else if (response.where === 'context') {
    if (response.name) ctx[response.name] = result;
    else Object.assign(ctx, result);
  } else if (response.where === 'cookies') {
    if (response.name) ctx.cookies.set(response.name, result, response.options);
    else throw new InternalServerError('The response in the cookie must have a name.');
  } else {
    ctx[options.name] = result;
  }

  return true;
}

module.exports = responseInjectionHandler;
