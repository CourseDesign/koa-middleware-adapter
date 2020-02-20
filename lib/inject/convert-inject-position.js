const injectValue = require('./inject-value');
const extractValue = require('../extract/extract-value');
const ItCantSideEffect = require('../error/it-cant-side-effect');

function InjectPosition({ context, name, setterAndGetter }) {
  this.position = context;
  this.name = name;
  this.setterAndGetter = setterAndGetter;

  // eslint-disable-next-line no-param-reassign
  context = undefined;
  // eslint-disable-next-line no-param-reassign
  name = undefined;
  // eslint-disable-next-line no-param-reassign
  setterAndGetter = undefined;

  Object.defineProperty(this, 'context', {
    set(value) {
      if (name === null || name === undefined) throw new ItCantSideEffect();
      injectValue(this.position, this.name, value, this.setterAndGetter.inject);
    },
    get() {
      if (name === null || name === undefined) return this.position;
      return extractValue(this.position, this.name, this.setterAndGetter.extract);
    },
  });
}

function convertInjectPosition(context, name, setterAndGetter) {
  return new InjectPosition({ context, name, setterAndGetter });
}

module.exports = convertInjectPosition;
