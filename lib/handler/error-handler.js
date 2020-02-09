function errorHandel(ctx, error) {
  ctx.response.status = error.statusCode || error.status || 500;

  if (ctx.response.status !== 500) ctx.response.body = { message: error.message };
  else ctx.response.body = { message: 'Internal server error' };
}

module.exports = errorHandel;
