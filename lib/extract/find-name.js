const Where = require('../where').default;

function findName(parameter) {
  const whereIsNotCustom = parameter.where instanceof Where;
  const parameterName = parameter.as || parameter.name;

  return whereIsNotCustom ? parameterName || parameter.where.name : parameterName;
}

module.exports = findName;
