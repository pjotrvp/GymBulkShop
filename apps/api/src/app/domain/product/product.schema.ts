import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {
  @Prop(String)
  name: string;

  @Prop(String)
  description: string;

  @Prop(Number)
  price: number;

  @Prop(String)
  image: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Review.name , required: false}])
  reviews: Review[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order' , required: false})
  orders: Types.ObjectId[];

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdById: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);