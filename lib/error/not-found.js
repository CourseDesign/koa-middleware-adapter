const Error = require('./error');

class NotFound extends Error {
  constructor(message = 'Not found.') {
    super({
      statusCode: 403,
      message,
    });
  }
}

module.exports = NotFound;
