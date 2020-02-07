const Error = require('./error');

class BadRequest extends Error {
  constructor(message = 'Bad request.') {
    super({
      statusCode: 400,
      message,
    });
  }
}

module.exports = BadRequest;
