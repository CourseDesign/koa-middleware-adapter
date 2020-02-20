const injectValue = require('./inject-value');
const extractValue = require('../extract/extract-value');
const ItCantSideEffect = require('../error/it-cant-side-effect');

function InjectPosition({ context, name, setterAndGetter }) {
  this.position = context;
  this.name = name;
  this.setterAndGetter = setterAndGetter;

  Object.defineProperty(this, 'context', {
    set(value) {
      if (this.name === null || this.name === undefined) throw new ItCantSideEffect();
      injectValue(this.position, this.name, value, this.setterAndGetter.inject);
    },
    get() {
      if (this.name === null || this.name === undefined) return this.position;
      return extractValue(this.position, this.name, this.setterAndGetter.extract);
    },
  });
}

function convertInjectPosition(context, name, setterAndGetter) {
  return new InjectPosition({ context, name, setterAndGetter });
}

module.exports = convertInjectPosition;
