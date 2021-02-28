export default abstract class Where {
  constructor(
    protected readonly name: string,
    protected readonly context: boolean,
    protected readonly koa: boolean,
    protected readonly node: boolean,
    protected readonly setterAndGetter: boolean,
  ) {}
}
