const error = require('./error');
const handler = require('./handler');
const middleware = require('./middleware');
const parameter = require('./parameter');
const response = require('./response');

module.exports = {
  ...error,
  ...handler,
  ...middleware,
  ...parameter,
  ...response,
};
