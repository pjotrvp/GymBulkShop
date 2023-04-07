import { Review } from '../review/review.schema';
import { Order } from '../order/order.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Supplement, SupplementDocument } from '../supplement/supplement.schema';
import { BundleDocument } from '../bundle/bundle.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop(String)
  name: string;

  @Prop(String)
  email: string;

  @Prop(String)
  password: string;

  @Prop(String)
  role: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplement' }] })
  supplements: SupplementDocument['_id'][];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bundle' }] })
  bundles: BundleDocument['_id'][];
}
export const UserSchema = SchemaFactory.createForClass(User);