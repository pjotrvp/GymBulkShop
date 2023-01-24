import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Kit } from '../kit/kit.schema';
import { Supplement } from '../supplement/supplement.schema';
export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  
  @Prop({ type : mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kit' }]})
  kits: Kit[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplement' }]})
  supplements: Supplement[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);