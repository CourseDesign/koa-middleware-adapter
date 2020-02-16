const Error = require('./error');

class ItCantSideEffect extends Error {
  constructor(message = 'It cant side effect.') {
    super({
      status: 500,
      message,
    });
  }
}

module.exports = ItCantSideEffect;
