function extractValue(context, name, setterAndGetter) {
  if (typeof context !== 'object' && (name === null || name === undefined)) return context;
  if (context === undefined || context === null) return null;

  if (setterAndGetter && setterAndGetter.extract && typeof context.get === 'function') return context.get(name);
  return context[name];
}

module.exports = extractValue;
