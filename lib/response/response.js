const body = require('./where/body');

function Response(
  where = body,
  options = {},
) {
  this.where = { ...where, type: 'response' };
  this.statusCode = options.statusCode || 200;
  this.name = options.name || null;
}

module.exports = Response;
