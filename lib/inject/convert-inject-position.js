const injectValue = require('./inject-value');
const extractValue = require('../extract/extract-value');
const ItCantSideEffect = require('../error/it-cant-side-effect');
const isExist = require('../util/is-exist');

function InjectPosition({ context, name, setterAndGetter }) {
  this.position = context;
  this.name = name;
  this.setterAndGetter = setterAndGetter;

  if (isExist(this.name) && !isExist(this.position[this.name])) {
    this.position[this.name] = {};
  }

  Object.defineProperty(this, 'context', {
    set(value) {
      if (!isExist(this.name)) throw new ItCantSideEffect();
      injectValue(this.position, this.name, value, this.setterAndGetter.inject);
    },
    get() {
      if (!isExist(this.name)) return this.position;
      return extractValue(this.position, this.name, this.setterAndGetter.extract);
    },
  });
}

function convertInjectPosition(context, name, setterAndGetter) {
  return new InjectPosition({ context, name, setterAndGetter });
}

module.exports = convertInjectPosition;
