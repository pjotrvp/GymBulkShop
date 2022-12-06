import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type KitDocument = HydratedDocument<Kit>;

@Schema()
export class Kit {
    
    @Prop()
    name: string;
    
    @Prop()
    description: string;
    
    @Prop()
    price: number;
    
    @Prop()
    image: string;
    
    @Prop()
    rating: number;
    
    @Prop()
    reviews: Review[];

    @Prop()
    orders: Order[];
}
export const KitSchema = SchemaFactory.createForClass(Kit);