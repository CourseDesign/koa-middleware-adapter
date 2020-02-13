const Error = require('./error');

class ParameterIsUndefined extends Error {
  constructor(message = 'Parameter is undefined.') {
    super({
      status: 500,
      message,
    });
  }
}

module.exports = ParameterIsUndefined;
