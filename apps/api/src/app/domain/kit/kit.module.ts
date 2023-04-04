import { Module } from '@nestjs/common';
import { Kit, KitSchema } from './kit.schema';
import { KitService } from './kit.service';

import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: Kit.name, schema: KitSchema }])],
  providers: [KitService],
})
export class KitModule {}
