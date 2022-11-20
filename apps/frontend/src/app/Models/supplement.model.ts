export enum SupplementType {
    Vitamin = "vitamin",
    FishOil = 'fishOil',
    Protein = 'protein',
    Creatine = "creatine",
    Other = 'other',
    PreWorkout =  'preWorkout',
}
import { Entity } from "./entity.model";
export class Supplement extends Entity {
    name : string = '';
    supplementType : SupplementType = SupplementType.Other;
    containsLactose : boolean = false; 
    isVegan : boolean = false;
    price : number = 0;
    constructor(
        id : string,
        name : string,
        supplementType : SupplementType,
        containsLactose : boolean,
        isVegan : boolean,
        price : number
    ) {
        super(id);
        this.name = name;
        this.supplementType = supplementType;
        this.containsLactose = containsLactose;
        this.isVegan = isVegan;
        this.price = price;
     }
        
    }
