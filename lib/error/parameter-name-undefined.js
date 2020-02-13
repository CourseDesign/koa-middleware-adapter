const Error = require('./error');

class ParameterNameUndefined extends Error {
  constructor(message = 'Parameter name undefined.') {
    super({
      status: 400,
      message,
    });
  }
}

module.exports = ParameterNameUndefined;
