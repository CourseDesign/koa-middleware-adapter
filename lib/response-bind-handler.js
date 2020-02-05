function responseBindHandler(ctx, bind, response) {
  if (response.statusCode >= 400 && response.statusCode < 600) {
    ctx.response.status = response.statusCode;
    ctx.response.body = response.body;
    ctx.response.headers = response.headers;

    return false;
  }

  // eslint-disable-next-line no-param-reassign
  if (!bind) bind = 'response';
  if (bind === 'response') {
    ctx.response.status = response.statusCode;
    ctx.response.body = response.body;
    ctx.response.headers = response.headers;
  } else if (bind === 'destructuring') {
    Object.assign(ctx, response.body);
  } else {
    ctx[bind] = response.body;
  }

  return true;
}

module.exports = responseBindHandler;
