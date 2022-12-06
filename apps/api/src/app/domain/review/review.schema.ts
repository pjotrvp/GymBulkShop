import { Supplement } from '../supplement/supplement.schema';
import { Kit } from '../kit/kit.schema';
import { User } from '../user/user.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ReviewDocument = HydratedDocument<Review>;
@Schema()
export class Review {

  @Prop([Number])
  rating: number;

  @Prop([String])
  description: string;

  @Prop([String])
  title: string;

  @Prop({ type : mongoose.Schema.Types.ObjectId, ref: 'Supplement' })
  supplement: Supplement;

  @Prop({ type : mongoose.Schema.Types.ObjectId, ref: 'Kit' })
  kit: Kit;

  @Prop({ type : mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);