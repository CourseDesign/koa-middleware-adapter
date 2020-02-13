const Parameter = require('./parameter');

const where = require('./where');
const headers = require('./headers');
const params = require('./params');
const query = require('./query');
const body = require('./body');
const cookies = require('./cookies');

module.exports = {
  Parameter, where, headers, params, query, body, cookies,
};
