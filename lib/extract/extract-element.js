function extractElement(context, name) {
  return context[name] !== undefined ? context[name] : context;
}

module.exports = extractElement;
