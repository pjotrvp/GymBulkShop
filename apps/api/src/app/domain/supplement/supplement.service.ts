import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Supplement, SupplementDocument } from './supplement.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { ObjectId as MongoObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSupplementDto } from './dto/createSupplement.dto';
import { UpdateSupplementDto } from './dto/updateSupplement.dto';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
import { UserService } from '../user/user.service';
import { Review } from '../review/review.schema';
import { CreateReviewDto } from '../review/dto/createReview.dto';
import { User } from '../user/user.schema';

@Injectable()
export class SupplementService {
  constructor(
    @InjectModel(Supplement.name)
    private supplementModel: Model<SupplementDocument>,
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService
  ) {}

  async create(supplementDto: CreateSupplementDto): Promise<Supplement> {
    const name = supplementDto.name;
    const supplement = await this.supplementModel.findOne({ name });
    if (supplement) {
      throw new BadRequestException('Supplement with this name already exists');
    }

    const currentUser = await this.userService.getCurrent();
    
    const createdById: MongoObjectId = currentUser['_id'];
    
    const createdSupplement = new this.supplementModel({
      ...supplementDto, 
    });

    createdSupplement.createdById = createdById;
    
    await createdSupplement.save();
    
    // Add the supplement reference to the user's supplements array
    const updatedUser = await this.userModel.findByIdAndUpdate(
      currentUser['_id'],
      { $push: { supplements: createdSupplement._id } },
      { new: true }
    );

    if (createdSupplement.$isValid) {
      const query = `
    CREATE (s:Supplement {
      name: "${createdSupplement.name}",
      createdBy: "${currentUser['name']}",
      id: "${createdSupplement._id}"
    })
    MERGE (u:User { id: "${currentUser['_id']}" })
    MERGE (u)-[:CREATED]->(s)
    RETURN s
  `;
      await this.neo4jService.write(query);
    }

    return createdSupplement;
  }

  async update(
    id: string,
    supplementDto: UpdateSupplementDto
  ): Promise<Supplement> {
    const supplement = await this.supplementModel.findById(id);
    if (!supplement) {
      throw new NotFoundException(`Supplement with id ${id} not found`);
    }
    const currentUser = this.userService.getCurrent();

    const createdById: MongoObjectId = supplement.createdById;
    const currentUserId = await this.userService.getCurrentId();
    if (
      createdById.toHexString() !== currentUserId
    ) {
      throw new ForbiddenException('Can only edit owned supplements');
    }

    

    const updatedSupplement = await this.supplementModel
      .findByIdAndUpdate(id, supplementDto, { new: true })
      .exec();
    await this.neo4jService.write(
      `MATCH (s:Supplement {id: "${id}"}) SET s.name = "${updatedSupplement.name}" RETURN s`
    );

    return updatedSupplement;
  }

  async findAll(): Promise<Supplement[]> {
    return this.supplementModel.find().exec();
  }

  async findOne(id: string): Promise<Supplement> {
    const supplement = await this.supplementModel.findOne({ _id: id}).exec();
    if (!supplement) {
      throw new NotFoundException(`Supplement with ID ${id} not found`);
    }
    return supplement;
  }

  async findByName(name: string): Promise<Supplement> {
    const supplement = await this.supplementModel.findOne({ name });
    if (!supplement) {
      throw new NotFoundException(`Supplement with name ${name} not found`);
    }
    return supplement;
  }
  async findRecommendations(id: string): Promise<Supplement[]> {
    const supplement = await this.supplementModel.findById(id);
    if (!supplement) {
      throw new NotFoundException(`Supplement with id ${id} not found`);
    }
    const supplementName = supplement.name;

    const result = await this.neo4jService.read(
      `MATCH (s1:Supplement {name: "${supplementName}"})<-[:ORDERED]-(u1:User)-[:ORDERED]->(s2:Supplement)
      WHERE s2 <> s1
      RETURN s2.name as name, count(u1) as users_ordered
      ORDER BY users_ordered DESC`
    );

    const recommendations = [];
    for (const record of result.records) {
      const name: string = record.get('name');
      const supplement = await this.findByName(name);
      if (supplement) {
        recommendations.push(supplement);
      }
    }

    return recommendations;
  }

  async remove(id: string) {
    const supplement = await this.supplementModel.findById(id);
    if (!supplement) {
      throw new NotFoundException(`Supplement with id ${id} not found`);
    }

    

    const createdById: MongoObjectId = supplement.createdById;
    const currentUserId = await this.userService.getCurrentId();
    if (createdById.toHexString() !== currentUserId) {
      throw new ForbiddenException('Can only remove owned supplements');
    }

    await this.neo4jService.write(
      `MATCH (s:Supplement {id: "${id}"}) DETACH DELETE s`
    );
    return this.supplementModel.findByIdAndRemove(id).exec();
  }

  async findReviewsById(supplementId: string): Promise<Review[]> {
    const supplement = this.supplementModel.findById(supplementId).exec();
    const reviews = (await supplement).reviews;
    return reviews;
  }

  async findSingleReviewById(
    supplementId: string,
    reviewId: string
  ): Promise<Review> {
    const supplement = await this.supplementModel.findById(supplementId).exec();
    const review = supplement.reviews['_id'](reviewId);
    if (!review) {
      throw new NotFoundException(`Review with id ${reviewId} not found`);
    }
    return review;
  }

  async addReview(supplementId: string, reviewDto: CreateReviewDto) {
    const supplement = await this.supplementModel.findById(supplementId).exec();
    const currentUser = await this.userService.getCurrent();

    const createdById: MongoObjectId = currentUser['_id'];
    const createdReview = new this.reviewModel({
      ...reviewDto,
    })
    createdReview.createdById = createdById;
    supplement.reviews.push(createdReview);
    await supplement.save();
    return createdReview;
  }

  async editReview(
    supplementId: string,
    reviewId: string,
    reviewDto: CreateReviewDto
  ) {
    const supplement = await this.supplementModel.findById(supplementId).exec();
    let review = supplement.reviews['_id'](reviewId);
    if (!review) {
      throw new NotFoundException(`Review with id ${reviewId} not found`);
    }
    const currentUserId = await this.userService.getCurrentId();
    if (review.createdById !== currentUserId) {
      throw new ForbiddenException('Can only edit owned reviews');
    }
    review = reviewDto;
    await supplement.save();
    return review;
  }

  async deleteReview(supplementId: string, reviewId: string) {
    const supplement = await this.supplementModel.findById(supplementId).exec();
    const review = supplement.reviews['_id'](reviewId);
    if (!review) {
      throw new NotFoundException(`Review with id ${reviewId} not found`);
    }
    const currentUserId = await this.userService.getCurrentId();
    if (review.createdById !== currentUserId) {
      throw new ForbiddenException('Can only delete owned reviews');
    }
    await review.remove();
    await supplement.save();
    return review;
  }
}
