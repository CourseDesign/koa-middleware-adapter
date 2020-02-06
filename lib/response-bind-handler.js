const Bind = require('./bind');

// TODO Split into another project
function responseBindHandler(ctx, bind, response) {
  if (response.statusCode >= 400 && response.statusCode < 600) {
    ctx.response.status = response.statusCode;
    ctx.response.body = response.body;
    ctx.response.headers = response.headers;

    return false;
  }

  // eslint-disable-next-line no-param-reassign
  if (!bind) bind = new Bind({ where: 'response' });
  if (bind.where === 'response') {
    if (bind.name) ctx.response.body[bind.name] = response.body;
    else ctx.response.body = response.body;
    ctx.response.headers = response.headers;
  } else if (bind.where === 'context') {
    if (bind.name) ctx[bind.name] = response.body;
    else Object.assign(ctx, response.body);
  } else if (bind.where === 'cookies') {
    ctx.cookies.set(bind.name, response.body, bind.options);
  } else {
    ctx[bind.name] = response.body;
  }
  ctx.response.status = response.statusCode;

  return true;
}

module.exports = responseBindHandler;
