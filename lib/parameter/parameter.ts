import { Where } from './where';

export default class Parameter {
  name: string | null;
  as: string | null;
  index: number;
  combineLevel: number;

  constructor(
    public readonly where = new Where(null, true, true, true),
    options?: {
      name?: string,
      as?: string,
      index?: number,
      combineLevel?: number,
    }
  ) {
    this.name = options?.name ?? null;
    this.as = options?.as ?? null;
    this.index = options?.index ?? 0;
    this.combineLevel = options?.combineLevel ?? 0;
  }
}
