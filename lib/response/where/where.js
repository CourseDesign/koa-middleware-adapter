import Where from '../../where';

class ResponseWhere extends Where {
  constructor(name = '', context = false, koa = false, node = false, setterAndGetter = { extract: false, inject: false }) {
    super(name, context, koa, node, setterAndGetter);
  }
}

module.exports = ResponseWhere;
