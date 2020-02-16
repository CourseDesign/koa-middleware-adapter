const Error = require('./error');

class Unauthorized extends Error {
  constructor(message = 'Unauthorized.') {
    super({
      status: 401,
      message,
    });
  }
}

module.exports = Unauthorized;
