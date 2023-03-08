import { Module } from '@nestjs/common';
import { Review, ReviewSchema } from './review.schema';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j/dist';
@Module({
    imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), Neo4jModule],
    providers: [ReviewService],
    controllers: [ReviewController],
})

export class ReviewModule {}