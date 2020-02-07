const Error = require('./error');

class InternalServerError extends Error {
  constructor(message = 'Internal server error.') {
    super({
      statusCode: 403,
      message,
    });
  }
}

module.exports = InternalServerError;
