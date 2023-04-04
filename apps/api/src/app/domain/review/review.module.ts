import { Module } from '@nestjs/common';
import { Review, ReviewSchema } from './review.schema';
import { ReviewService } from './review.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    Neo4jModule,
  ],
  providers: [ReviewService],
  
})
export class ReviewModule {}
