function isInContext(context, name) {
  return !name ? true : context[name] !== undefined;
}

module.exports = isInContext;
