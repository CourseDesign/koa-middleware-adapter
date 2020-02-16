function injectValue(context, name, value, setterAndGetter, options) {
  if (setterAndGetter && typeof context.set === 'function') {
    if (options) context.set(name, value, options);
    else context.set(name, value);
    // eslint-disable-next-line no-param-reassign
  } else context[name] = value;
}

module.exports = injectValue;
