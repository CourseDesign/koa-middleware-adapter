const Error = require('./error');

class Forbidden extends Error {
  constructor(message = 'Forbidden.') {
    super({
      statusCode: 403,
      message,
    });
  }
}

module.exports = Forbidden;
