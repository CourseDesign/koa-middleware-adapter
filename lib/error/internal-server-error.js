const Error = require('./error');

class InternalServerError extends Error {
  constructor(message = 'Internal server error.') {
    super({
      statusCode: 500,
      message,
    });
  }
}

module.exports = InternalServerError;
