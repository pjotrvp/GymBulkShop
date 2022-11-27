import { Entity } from './entity.model';
import { User } from './user.model';
import { Supplement } from './supplement.model';
export class Review extends Entity {
    rating : number = 0;
    text : string = '';
    userId : string = '';
    supplementId : string = '';
    title : string = '';
    constructor(
        id : string,
        rating : number,
        text : string,
        userId : string,
        supplementId : string,
        title : string,
    ) {
        super(id);
        this.rating = rating;
        this.text = text;
        this.userId = userId;
        this.supplementId = supplementId;
        this.title = title;
    }
}