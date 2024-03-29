import { User } from '../user/user.schema';
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/product.schema';
export type ReviewDocument = HydratedDocument<Review>;
@Schema()
export class Review {
  @Prop(Number)
  rating: number;

  @Prop(String)
  description: string;

  @Prop(String)
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdById: Types.ObjectId['_id'];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);