const Error = require('./error');

class WhereIsUndefined extends Error {
  constructor(message = 'Where is undefined.') {
    super({
      status: 500,
      message,
    });
  }
}

module.exports = WhereIsUndefined;
