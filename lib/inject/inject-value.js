function injectValue(context, name, value, setterAndGetter) {
  if (setterAndGetter && typeof context.set === 'function') context.set(name, value);
  // eslint-disable-next-line no-param-reassign
  else context[name] = value;
}

module.exports = injectValue;
