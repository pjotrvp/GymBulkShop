import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Kit } from '../kit/kit.schema';
import { Supplement } from '../supplement/supplement.schema';
export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  
  @Prop()
  user: User;

  @Prop()
  kits: Kit[];

  @Prop()
  supplements: Supplement[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);