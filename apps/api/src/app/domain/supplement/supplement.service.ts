import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Supplement, SupplementDocument } from './supplement.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSupplementDto } from './dto/createSupplement.dto';
import { UpdateSupplementDto } from './dto/updateSupplement.dto';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SupplementService {
  constructor(
    @InjectModel(Supplement.name)
    private supplementModel: Model<SupplementDocument>,
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService
  ) {}
  async create(supplementDto: CreateSupplementDto): Promise<Supplement> {
    const supplement = await this.findByName(supplementDto.name);
    if (supplement) {
      throw new BadRequestException('Supplement with this name already exists');
    }
    const currentUser = this.userService.getCurrent();
    const createdBy: string = currentUser['_id'];
    const createdSupplement = new this.supplementModel(
      supplementDto,
      createdBy
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

    const session = await this.supplementModel.startSession();
    session.startTransaction();
    try {
      const savedSupplement = await createdSupplement.save({ session });
      await session.commitTransaction();
      return savedSupplement;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async update(
    id: string,
    supplementDto: UpdateSupplementDto
  ): Promise<Supplement> {
    const supplement = await this.supplementModel.findById(id);
    if (!supplement) {
      throw new NotFoundException(`Supplement with id ${id} not found`);
    }

    const currentUserId = await this.userService.getCurrentId();
    if (supplement.createdById !== currentUserId) {
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

  async findOne(id: number): Promise<Supplement> {
    return this.supplementModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Supplement> {
    const supplement = await this.supplementModel.findOne({ name });
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
      const supplement = await this.findByName( name );
      if (supplement) {
        recommendations.push(supplement);
      }
    }

    return recommendations;
  }

  async remove(id: string) {
    await this.neo4jService.write(
      `MATCH (s:Supplement {id: "${id}"}) DETACH DELETE s`
    );
    return this.supplementModel.findByIdAndRemove(id).exec();
  }
}
