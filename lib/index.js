const httpAdapter = require('simple-http-adapter');
const extractor = require('koa-params-extractor');
const createAdapter = require('./create-adapter');

module.exports = {
  Error: httpAdapter.Error,
  BadRequest: httpAdapter.BadRequest,
  Unauthorized: httpAdapter.Unauthorized,
  Forbidden: httpAdapter.Forbidden,
  NotFound: httpAdapter.NotFound,
  MethodNotAllowed: httpAdapter.MethodNotAllowed,
  InternalServerError: httpAdapter.InternalServerError,
  create: createAdapter,
  ...extractor,
};
