const Error = require('./error');

class Unauthorized extends Error {
  constructor(message = 'Unauthorized.') {
    super({
      statusCode: 401,
      message,
    });
  }
}

module.exports = Unauthorized;
