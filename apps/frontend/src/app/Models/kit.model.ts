export enum KitType {
  Machine = 'machine',
  FreeWeight = 'freeWeight',
  Other = 'other',
  Accessory = 'accessory',
  Shoes = 'shoes',
  Merch = 'merch',
}
import { Review } from './review.model';
import { Product } from './product.model';
export class Kit extends Product {
  kitType: KitType = KitType.Other;
  resistance: number = 0;
  price: number = 0;
  constructor(
    id: string,
    name: string,
    kitType: KitType,
    resistance: number,
    price: number,
    reviews: Review[]
  ) {
    super(id, name, reviews);
    this.kitType = kitType;
    this.resistance = resistance;
    this.price = price;
  }
}
