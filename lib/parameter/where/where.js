const Where = require('../../where/where');

class ParameterWhere extends Where {
  constructor(name = '', context = false, koa = false, node = false, setterAndGetter = true) {
    super(name, context, koa, node, setterAndGetter);
  }
}

module.exports = ParameterWhere;
