function extractValue(context, name) {
  if (typeof context.get === 'function') return context.get(name);
  return context[name];
}

module.exports = extractValue;
