import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Product } from '../product/product.schema';

export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Product' }] })
  products: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdById: Types.ObjectId;
}
export const OrderSchema = SchemaFactory.createForClass(Order);