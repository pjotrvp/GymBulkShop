import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, {HydratedDocument} from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type SupplementDocument = HydratedDocument<Supplement>;

@Schema()
export class Supplement {

    @Prop()
    name: string;

    @Prop()
    supplementType: string;

    @Prop()
    containsLactose: boolean;

    @Prop()
    isVegan: boolean;

    @Prop()
    price: number;

    @Prop()
    flavours: string[];

    @Prop()
    sizes: string[];

    @Prop()
    ingredients: string[];

    @Prop()
    reviews: Review[];

    @Prop()
    orders: Order;
}
export const SupplementSchema = SchemaFactory.createForClass(Supplement);