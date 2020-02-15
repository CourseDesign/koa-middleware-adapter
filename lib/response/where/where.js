const Where = require('../../where/where');

class ResponseWhere extends Where {
  constructor(name = '', context = false, koa = false, node = false, setterAndGetter = false) {
    super(name, context, koa, node, setterAndGetter);
  }
}

module.exports = ResponseWhere;
