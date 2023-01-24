export class UpdateSupplementDto {
    name?: string;
    supplementType?: string;
    containsLactose?: boolean;
    isVegan?: boolean;
    price?: number;
    flavours?: string[];
    sizes?: string[];
    ingredients?: string[];
    reviews?: string[];
    order?: string;
}