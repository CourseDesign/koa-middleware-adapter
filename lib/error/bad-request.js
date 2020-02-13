const Error = require('./error');

class BadRequest extends Error {
  constructor(message = 'Bad request.') {
    super({
      status: 400,
      message,
    });
  }
}

module.exports = BadRequest;
