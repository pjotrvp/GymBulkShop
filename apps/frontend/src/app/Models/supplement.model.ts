export enum SupplementType {
  Vitamin = 'Vitamin',
  FishOil = 'Fish oil',
  Protein = 'Protein',
  Creatine = 'Creatine',
  Other = 'Other',
  PreWorkout = 'Pre-Workout',
}
import { Product } from './product.model';
import { Review } from './review.model';
export class Supplement extends Product {
  constructor(id: string, name: string, reviews: Review[]) {
    super(id, name, reviews);
  }
  description: string = '';
  flavours: string[] = [];
  image: string = '';
  sizes: string[] = [];
  ingredients: string[] = [];
  supplementType: SupplementType = SupplementType.Other;
  containsLactose: boolean = false;
  isVegan: boolean = false;
  price: number = 0;
}
