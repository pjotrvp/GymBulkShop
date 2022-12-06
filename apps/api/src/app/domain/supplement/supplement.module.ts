import { Module } from '@nestjs/common';
import { Supplement, SupplementSchema } from './supplement.schema';
import { SupplementService } from './supplement.service';
import { SupplementController } from './supplement.controller';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [MongooseModule.forFeature([{ name: Supplement.name, schema: SupplementSchema }])],
    providers: [SupplementService],
    controllers: [SupplementController],
})

export class SupplementModule {}
