export enum KitType {
  Machine = 'machine',
  FreeWeight = 'freeWeight',
  Other = 'other',
  Accessory = 'accessory',
  Shoes = 'shoes',
  Merch = 'merch',
}

import { Entity } from './entity.model';
export class Kit extends Entity {
  name: string = '';
  kitType: KitType = KitType.Other;
  resistance: number = 0;
  price: number = 0;
  constructor(id: string, name: string) {
    super(id);
  }
}
