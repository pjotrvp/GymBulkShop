import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, { HydratedDocument } from 'mongoose';
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orders: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);