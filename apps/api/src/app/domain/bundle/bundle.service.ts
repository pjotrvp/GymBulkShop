import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId as MongoObjectId } from 'mongodb';
import { Bundle, BundleDocument } from './bundle.schema';
import { Review } from '../review/review.schema';
import { User } from '../user/user.schema';
import { CreateBundleDto } from './dto/createBundle.dto';
import { UserService } from '../user/user.service';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';

@Injectable()
export class BundleService {
  constructor(
    @InjectModel(Bundle.name)
    private bundleModel: Model<BundleDocument>,
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly userService: UserService,
    private readonly neo4jService: Neo4jService
  ) {}

  async create(bundleDto: CreateBundleDto): Promise<Bundle> {
    const name = bundleDto.name;
    const bundle = await this.bundleModel.findOne({ name });
    if (bundle) {
      throw new BadRequestException('Bundle with this name already exists');
    }

    const currentUser = this.userService.getCurrent();
    const createdById: MongoObjectId = currentUser['_id'];
    const createdBundle = new this.bundleModel({
      ...bundleDto,
    });

    createdBundle.createdById = createdById;

    await createdBundle.save();

    const updatedUser = await this.userModel.findByIdAndUpdate(
      currentUser['_id'],
      { $push: { bundles: createdBundle._id } },
      { new: true }
    );

    if (createdBundle.$isValid) {
      const query = `
            CREATE (b:Bundle {
                name: "${createdBundle.name}",
                createdBy: "${currentUser['name']}",
                id: "${createdBundle._id}"
                })
                MERGE   (u:User { id: "${currentUser['_id']}" })
                MERGE   (u)-[:CREATED]->(b)
                RETURN s`;
      await this.neo4jService.write(query);
    }
    return createdBundle;
  }

  async update(id: string, bundleDto: CreateBundleDto): Promise<Bundle> {
    const bundle = await this.bundleModel.findById(id);
    if (!bundle) {
      throw new NotFoundException(`Bundle with id ${id} not found`);
    }
    const createdById: MongoObjectId = bundle.createdById;
    const currentUserId = await this.userService.getCurrentId();

    if (createdById !== currentUserId) {
      throw new ForbiddenException('Can only edit owned supplements');
    }

    const updatedBundle = await this.bundleModel
      .findByIdAndUpdate(id, bundleDto, { new: true })
      .exec();

    await this.neo4jService.write(
      `MATCH (b:Bundle { id: "${id}" }) SET b.name = "${bundleDto.name}" RETURN b`
    );
    return updatedBundle;
  }

  async findAll(): Promise<Bundle[]> {
    return await this.bundleModel.find().exec();
  }

  async findOne(id: string): Promise<Bundle> {
    const bundle = await this.bundleModel.findById(id).exec();
    if (!bundle) {
      throw new NotFoundException(`Bundle with id ${id} not found`);
    }
    return bundle;
  }

  async findByName(name: string): Promise<Bundle> {
    const bundle = await this.bundleModel.findOne({ name });
    if (!bundle) {
      throw new NotFoundException(`Bundle with name ${name} not found`);
    }
    return bundle;
  }

  async findRecommendations(id: string): Promise<Bundle[]> {
    const bundle = await this.bundleModel.findById(id);
    if (!bundle) {
      throw new NotFoundException(`bundle with id ${id} not found`);
    }
    const bundleName = bundle.name;

    const result = await this.neo4jService.read(
      `MATCH (b1:Bundle {name: "${bundleName}"})<-[:ORDERED]-(u1:User)-[:ORDERED]->(b2:Bundle)
      WHERE b2 <> b1
      RETURN b2.name as name, count(u1) as users_ordered
      ORDER BY users_ordered DESC`
    );

    const recommendations = [];
    for (const record of result.records) {
      const name: string = record.get('name');
      const bundle = await this.findByName(name);
      if (bundle) {
        recommendations.push(bundle);
      }
    }

    return recommendations;
  }

  async remove(id: string): Promise<Bundle> {
    const bundle = await this.bundleModel.findById(id);
    if (!bundle) {
      throw new NotFoundException(`Bundle with id ${id} not found`);
    }
    const createdById: MongoObjectId = bundle.createdById;
    const currentUserId = await this.userService.getCurrentId();
    if (createdById !== currentUserId) {
      throw new ForbiddenException('Can only edit owned supplements');
    }
    await this.neo4jService.write(
      `MATCH (b:Bundle { id: "${id}" }) DETACH DELETE b`
    );
    return this.bundleModel.findByIdAndRemove(id).exec();
  }

  async addProduct(bundleId: string, productId: string): Promise<Bundle> {
    const bundle = await this.bundleModel.findById(bundleId);
    if (!bundle) {
      throw new NotFoundException(`Bundle with id ${bundleId} not found`);
    }
    const createdById: MongoObjectId = bundle.createdById;
    const currentUserId = await this.userService.getCurrentId();
    if (createdById !== currentUserId) {
      throw new ForbiddenException('Can only edit owned supplements');
    }
    const updatedBundle = await this.bundleModel
      .findByIdAndUpdate(
        bundleId,
        { $push: { products: productId } },
        { new: true }
      )
      .exec();
    return updatedBundle;
  }

    async removeProduct(bundleId: string, productId: string): Promise<Bundle> {
    const bundle = await this.bundleModel.findById(bundleId);
    if (!bundle) {
        throw new NotFoundException(`Bundle with id ${bundleId} not found`);
        }
        const createdById: MongoObjectId = bundle.createdById;
        const currentUserId = await this.userService.getCurrentId();
        if(createdById !== currentUserId) {
            throw new ForbiddenException('Can only edit owned bundles');
        }
        const updatedBundle = await this.bundleModel
        .findByIdAndUpdate(
            bundleId,
            { $pull: { products: productId } },
            { new: true }
        )
        .exec();
        return updatedBundle;
    }
}
