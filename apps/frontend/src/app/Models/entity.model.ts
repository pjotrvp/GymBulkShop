export abstract class Entity {
  _id!: string | undefined;

  constructor(values: any) {
    this._id = values ? values._id : undefined;
  }
}
