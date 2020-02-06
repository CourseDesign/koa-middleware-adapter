const httpAdapter = require('simple-http-adapter');
const extractor = require('koa-params-extractor');
const createAdapter = require('./create-adapter');
const Bind = require('./bind');

const publicHttpAdapter = { ...httpAdapter };
delete publicHttpAdapter.convert;

module.exports = {
  create: createAdapter,
  Bind,
  ...publicHttpAdapter,
  ...extractor,
};
