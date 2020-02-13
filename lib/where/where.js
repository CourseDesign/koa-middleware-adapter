function Where(name, context, koa, node, type = undefined) {
  this.name = name;
  this.context = context;
  this.koa = koa;
  this.node = node;
  this.type = type;
}

module.exports = Where;
