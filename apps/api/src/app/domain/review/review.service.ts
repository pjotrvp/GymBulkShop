import { Review, ReviewDocument } from './review.schema';
import { ReviewDto } from './review.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>
  ) {
    console.log('ReviewService: ', Review);
  }
  async create(reviewDto: ReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(reviewDto);
    return createdReview.save();
  }

  async edit(id: string, reviewDto: ReviewDto): Promise<Review> {
    return this.reviewModel
      .findByIdAndUpdate(id, reviewDto, { new: true })
      .exec();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(id: number): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async remove(id: string) {
    return this.reviewModel.findByIdAndRemove(id).exec();
  }
}
