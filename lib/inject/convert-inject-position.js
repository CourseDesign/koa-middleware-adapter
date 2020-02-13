const injectValue = require('./inject-value');
const extractValue = require('../extract/extract-value');
const ItCantSideEffect = require('../error/it-cant-side-effect');

function convertInjectPosition(context, name) {
  const position = {
    position: context,
    name,
  };

  Object.defineProperty(position, 'context', {
    set(value) {
      if (name === null || name === undefined) throw new ItCantSideEffect();
      injectValue(this.position, this.name, value);
    },
    get() {
      if (name === null || name === undefined) return this.position;
      return extractValue(this.position, this.name);
    },
  });

  return position;
}

module.exports = convertInjectPosition;
