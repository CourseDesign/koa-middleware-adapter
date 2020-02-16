function isExtractMany(parameters = []) {
  return parameters.some((parameter) => parameter.index);
}

module.exports = isExtractMany;
