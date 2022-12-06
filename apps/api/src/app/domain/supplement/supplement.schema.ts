import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, {HydratedDocument} from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type SupplementDocument = HydratedDocument<Supplement>;

@Schema()
export class Supplement {

    @Prop([String])
    name: string;

    @Prop([String])
    supplementType: string;

    @Prop([Boolean])
    containsLactose: boolean;

    @Prop([Boolean])
    isVegan: boolean;

    @Prop([Number])
    price: number;

    @Prop([String])
    flavours: string[];

    @Prop([String])
    sizes: string[];

    @Prop([String])
    ingredients: string[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]})
    reviews: Review[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
    orders: Order;
}
export const SupplementSchema = SchemaFactory.createForClass(Supplement);