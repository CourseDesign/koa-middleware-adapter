const Error = require('./error');

class MethodNotAllowed extends Error {
  constructor(message = 'Method Not Allowed.') {
    super({
      status: 405,
      message,
    });
  }
}

module.exports = MethodNotAllowed;
