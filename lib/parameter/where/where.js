const Where = require('../../where/where');

class ParameterWhere extends Where {
  constructor(name, context, koa, node, setterAndGetter = true) {
    super(name, context, koa, node, setterAndGetter);
  }
}

module.exports = ParameterWhere;
