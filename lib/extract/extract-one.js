const extractParameter = require('./extract-parameter');
const findName = require('./find-name');
const isPureObject = require('../util/is-pure-object');

const ParameterNameUndefined = require('../error/parameter-name-undefined');

function extractOne(ctx, parameters) {
  if (!parameters) return undefined;

  let request;

  parameters.forEach((parameter) => {
    const param = extractParameter(ctx, parameter);
    const name = findName(parameter);

    if (param !== undefined) {
      if (request === undefined) request = {};

      if (!parameter.combineLevel) {
        if (typeof request === 'object' && typeof param === 'object') {
          if (isPureObject(request)) request = Object.assign(param, request);
          else if (isPureObject(param)) request = Object.assign(request, param);
          else request = { ...request, ...param };
        } else request = param;
      } else {
        if (name === undefined) throw new ParameterNameUndefined();
        request[name] = param;
      }
    }
  });

  return request;
}

module.exports = extractOne;
