const Where = require('../where/where');

function Response(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = where;
  this.name = options.name || null;
  this.setterAndGetter = options.setterAndGetter !== undefined ? options.setterAndGetter : true;
}

module.exports = Response;
