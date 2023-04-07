import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Product } from '../product/product.schema';
import { User} from '../user/user.schema';

export type BundleDocument = HydratedDocument<Bundle>;
@Schema()
export class Bundle extends Product {

  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name})
  products: Product[];  
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdById: Types.ObjectId['_id'];
}

export const BundleSchema = SchemaFactory.createForClass(Bundle);
