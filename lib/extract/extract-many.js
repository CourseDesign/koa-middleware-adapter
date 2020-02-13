const extractOne = require('./extract-one');

function extractMany(ctx, parameters) {
  if (!parameters) return undefined;

  const request = [];

  const classifiedParameters = [];
  parameters.forEach((parameter) => {
    if (!classifiedParameters[parameter.index]) classifiedParameters[parameter.index] = [];

    classifiedParameters[parameter.index].push(parameter);
  });

  classifiedParameters.forEach((parameter) => {
    request.push(extractOne(ctx, parameter));
  });

  return request;
}

module.exports = extractMany;
