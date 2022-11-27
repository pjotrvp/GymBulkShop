export enum SupplementType {
    Vitamin = "vitamin",
    FishOil = 'fishOil',
    Protein = 'protein',
    Creatine = "creatine",
    Other = 'other',
    PreWorkout =  'preWorkout',
}
import { Entity } from "./entity.model";
import { Review } from './review.model';
export class Supplement extends Entity {
    flavours : string[];
    sizes : string[];
    reviews : Review[];
    ingredients : string[];
    name : string = '';
    supplementType : SupplementType = SupplementType.Other;
    containsLactose : boolean = false; 
    isVegan : boolean = false;
    price : number = 0;
    constructor(
        flavours : string[],
        sizes : string[],
        id : string,
        name : string,
        supplementType : SupplementType,
        containsLactose : boolean,
        isVegan : boolean,
        price : number,
        Reviews : Review[],
        ingredients : string[],
    ) {
        super(id);
        this.flavours = flavours;
        this.sizes = sizes;
        this.name = name;
        this.supplementType = supplementType;
        this.containsLactose = containsLactose;
        this.isVegan = isVegan;
        this.price = price;
        this.reviews = Reviews;
        this.ingredients = ingredients;
     }
        
    }
