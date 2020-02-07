const httpAdapter = require('simple-http-adapter');
const extractor = require('koa-params-extractor');
const createAdapter = require('./create-adapter');
const Bind = require('./bind');
const responseBindHandler = require('./response-bind-handler');

const publicHttpAdapter = { ...httpAdapter };
delete publicHttpAdapter.convert;

module.exports = {
  create: createAdapter,
  Bind,
  responseBindHandler,
  ...publicHttpAdapter,
  ...extractor,
};
