import Where from '../../where';

export default class ParameterWhere extends Where {
  constructor(name: string | null, context = false, koa = false, node = false, setterAndGetter = true) {
    super(name ?? '', context, koa, node, setterAndGetter);
  }
}
