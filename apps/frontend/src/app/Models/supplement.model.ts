export enum SupplementType {
    Vitamin = "vitamin",
    FishOil = 'fishOil',
    Protein = 'protein',
    Creatine = "creatine",
    Other = 'other',
    PreWorkout =  'preWorkout',
}
import { Product } from './product.model';
import { Review } from './review.model';
export class Supplement extends Product {
    flavours : string[];
    sizes : string[];
    ingredients : string[];
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
        reviews : Review[],
        ingredients : string[],
    ) {
        super(id, name, reviews);
        this.flavours = flavours;
        this.sizes = sizes;
        this.name = name;
        this.supplementType = supplementType;
        this.containsLactose = containsLactose;
        this.isVegan = isVegan;
        this.price = price;
        this.ingredients = ingredients;
     }
        
    }
