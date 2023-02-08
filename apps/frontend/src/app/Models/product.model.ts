import { Entity } from './entity.model';
import { Review } from './review.model';
export class Product extends Entity {
    name: string = '';
    reviews: Review[] = [];
    constructor(id: string, name: string, reviews: Review[]) {
        super(id);
    }
}