import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop([String])
    name: string;

    @Prop([String])
    email: string;

    @Prop([String])
    password: string;

    @Prop([String])
    role: string;

    @Prop()
    reviews: Review[];

    @Prop()
    orders: Order[];

}
export const UserSchema = SchemaFactory.createForClass(User);