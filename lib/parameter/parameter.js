const Where = require('../where/where');

function Parameter(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = where;
  if (!this.where.type) this.where.type = 'request';
  this.name = options.name || null;
  this.as = options.as || null;
  this.index = options.index || 0;
  this.combineLevel = options.combineLevel || 0;
}

module.exports = Parameter;
