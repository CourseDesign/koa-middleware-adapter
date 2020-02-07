const Error = require('../error/error');

function errorHandel(ctx, error) {
  if (error instanceof Error) {
    ctx.response.status = error.statusCode;
    ctx.response.body = { message: error.message };
    return;
  }

  ctx.response.status = 500;
  ctx.response.body = { message: 'Undefined error' };
}

module.exports = errorHandel;
