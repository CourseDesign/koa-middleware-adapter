const Where = require('../../where/where');

class ResponseWhere extends Where {
  constructor(name, context, koa, node, setterAndGetter = false) {
    super(name, context, koa, node, setterAndGetter);
  }
}

module.exports = ResponseWhere;
