import { Review, ReviewDocument } from './review.schema';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { CreateReviewDto } from './dto/createReview.dto';
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
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
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
    return this.reviewModel.findByIdAndRemove(id).exec();
  }
}
