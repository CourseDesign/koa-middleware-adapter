async function callListener(ctx, listener, thisArg, args) {
  if (!thisArg) return listener(...args);

  let context = thisArg;
  if (typeof thisArg === 'function') context = await thisArg(ctx);

  return listener.apply(context, args);
}

module.exports = callListener;
