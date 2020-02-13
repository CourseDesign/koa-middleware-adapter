const body = require('./where/body');

function Response(
  where = body,
  options = {},
) {
  this.where = where;
  if (!this.where.type) this.where.type = 'response';
  this.name = options.name || null;
}

module.exports = Response;
