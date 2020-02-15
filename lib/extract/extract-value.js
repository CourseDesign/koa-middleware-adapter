function extractValue(context, name, setterAndGetter) {
  if (setterAndGetter && typeof context.get === 'function') return context.get(name);
  return context[name];
}

module.exports = extractValue;
