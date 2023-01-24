import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type KitDocument = HydratedDocument<Kit>;

@Schema()
export class Kit {
    
    @Prop([String])
    name: string;
    
    @Prop([String])
    description: string;
    
    @Prop([Number])
    price: number;
    
    @Prop([String])
    image: string;
    
    @Prop([Number])
    rating: number;
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]})
    reviews: Review[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]})
    orders: Order[];
}
export const KitSchema = SchemaFactory.createForClass(Kit);