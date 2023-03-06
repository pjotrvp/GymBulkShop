import { Module } from '@nestjs/common';
import { Supplement, SupplementSchema } from './supplement.schema';
import { SupplementService } from './supplement.service';
import { SupplementController } from './supplement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplement.name, schema: SupplementSchema },
    ]),
    Neo4jModule,
  ],
  providers: [
    SupplementService,
  ],
  controllers: [SupplementController],
})
export class SupplementModule {}
