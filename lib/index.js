const middleware = require('./middleware');
const parameter = require('./parameter');
const response = require('./response');
const where = require('./where');
const error = require('./error');
const handler = require('./handler');
const extract = require('./extract');
const inject = require('./inject');

module.exports = {
  ...middleware,
  parameter,
  response,
  ...where,
  ...error,
  ...handler,
  ...extract,
  ...inject,
};
