const Where = require('../where/where');

function Response(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = where;
  if (!this.where.type) this.where.type = 'response';
  this.name = options.name || null;
}

module.exports = Response;
