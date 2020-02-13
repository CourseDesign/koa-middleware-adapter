const Where = require('../response/where');

function Parameter(
  where = new Where(null, true, true, true),
  options = {},
) {
  this.where = { ...where, type: 'request' };
  this.name = options.name || null;
  this.as = options.as || null;
  this.index = options.index || 0;
  this.combineLevel = options.combineLevel || 0;
}

module.exports = Parameter;
