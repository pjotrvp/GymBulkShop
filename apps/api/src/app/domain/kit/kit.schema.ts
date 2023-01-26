import { Product } from '../product/product.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const kitType = {
  values: ['machine', 'freeWeight', 'other', 'accessory', 'shoes', 'merch'],
  message: '{VALUE} is not a valid kit type',
};

export type KitDocument = HydratedDocument<Kit>;
@Schema()
export class Kit extends Product {
  @Prop({
    type: String,
    enum: kitType,
  })
  kitType: string;
}
export const KitSchema = SchemaFactory.createForClass(Kit);
