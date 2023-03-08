import { Review, ReviewDocument } from './review.schema';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { CreateReviewDto } from './dto/createReview.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private readonly neo4jService: Neo4jService
  ) {
    console.log('ReviewService: ', Review);
  }
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
    await this.neo4jService.write(
      `CREATE (r:Review {name: "${createdReview.title}", createdBy: "${createdReview.user}", id: "${createdReview._id}"}) 
      MERGE (s:Supplement {id: "${createdReview.supplement}"}) MERGE (s)-[:REVIEWED]->(r)
      MERGE (u:User {id: "${createdReview.user}"}) MERGE (u)-[:CREATED]->(r) RETURN r`
    );
    return createdReview.save();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(id: number): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async remove(id: string) {
    await this.neo4jService.write(
      `MATCH (r:Review {id: "${id}"}) DETACH DELETE r`
    );
    return this.reviewModel.findByIdAndRemove(id).exec();
  }
}
