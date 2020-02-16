const where = require('./where/headers');
const Response = require('./response');

module.exports = new Response(where, { name: 'Location' });
