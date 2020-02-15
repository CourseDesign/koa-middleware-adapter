function Where(name, context, koa, node, setterAndGetter) {
  this.name = name;
  this.context = context;
  this.koa = koa;
  this.node = node;
  this.setterAndGetter = setterAndGetter;
}

module.exports = Where;
