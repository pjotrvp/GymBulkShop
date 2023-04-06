import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/product.schema';
import { User, UserDocument } from '../user/user.schema';

const SupplementType = {
  values: [
    'protein',
    'creatine',
    'pre-workout',
    'post-workout',
    'vitamins',
    'other',
  ],
  message: '{VALUE} is not a valid supplement type',
};
export type SupplementDocument = HydratedDocument<Supplement>;

@Schema()
export class Supplement extends Product {
  @Prop({
    type: String,
    enum: SupplementType,
  })
  supplementType: string;

  @Prop(Boolean)
  containsLactose: boolean;

  @Prop(Boolean)
  isVegan: boolean;

  @Prop([String])
  flavours: string[];

  @Prop([String])
  sizes: string[];

  @Prop([String])
  ingredients: string[];

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdById: Types.ObjectId['_id'];
}
export const SupplementSchema = SchemaFactory.createForClass(Supplement);
