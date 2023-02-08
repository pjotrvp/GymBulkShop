import { Entity } from './entity.model';
import { User } from './user.model';
import { Product } from './product.model';
export class Review extends Entity {
    rating : number = 0;
    text : string = '';
    title : string = '';
    supplementId : string = '';
    userId : string = '';
    constructor(
        id : string,
        rating : number,
        text : string,
        userId : string,
        title : string,
    ) {
        super(id);
        this.rating = rating;
        this.text = text;
        this.userId = userId;
        this.title = title;
    }
}