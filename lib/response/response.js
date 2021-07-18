const Where = require('../where');

function Response(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = where;
  this.name = options.name || null;
  this.type = options.type;
}

module.exports = Response;
