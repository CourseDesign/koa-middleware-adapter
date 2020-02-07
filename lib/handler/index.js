const parameterExtractionHandler = require('./parameter-extraction-handler');
const responseInjectionHandler = require('./response-injection-handler');
const errorHandler = require('./error-handler');

module.exports = {
  parameterExtractionHandler,
  responseInjectionHandler,
  errorHandler,
};
