const Error = require('./error');
const BadRequest = require('./bad-request');
const Unauthorized = require('./unauthorized');
const Forbidden = require('./forbidden');
const NotFound = require('./not-found');
const MethodNotAllowed = require('./method-not-allowed');
const InternalServerError = require('./internal-server-error');

module.exports = {
  Error,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  InternalServerError,
};
