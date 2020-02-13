const Error = require('./error');

class WhereTypeIsUndefined extends Error {
  constructor(message = 'Where type is undefined.') {
    super({
      status: 500,
      message,
    });
  }
}

module.exports = WhereTypeIsUndefined;
