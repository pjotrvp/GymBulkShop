import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    


  ) {
    
  }
  async create(supplementDto: CreateSupplementDto): Promise<Supplement> {
    const supplement = await this.findByName(supplementDto.name);
    if(supplement) {
      throw new BadRequestException('Supplement with this name already exists');
    }
    const currentUser = this.userService.getCurrent();
    const createdBy: string = currentUser['_id'];
    const createdSupplement = new this.supplementModel(supplementDto, createdBy);
    if(createdSupplement.$isValid) {
      await this.neo4jService.write(
        `CREATE (s:Supplement {name: "${createdSupplement.name}", createdBy: "${
          (
            await currentUser
          ).name
        }", id: "${createdSupplement._id}"}) MERGE (u:User {id: "${
          currentUser['_id']
        }"}) MERGE (u)-[:CREATED]->(s) RETURN s`
      );
    }
    
    return createdSupplement.save();
  }

  async update(id: string, supplementDto: UpdateSupplementDto): Promise<Supplement> {
    const currentUserId = await this.userService.getCurrentId();
    const supplementCreatedById = (await this.supplementModel.findById(id)).createdById;
    if (currentUserId !== supplementCreatedById) {
      throw new HttpException(
        'Can only edit owned supplements',
        HttpStatus.FORBIDDEN
      );
    }
    return this.supplementModel
      .findByIdAndUpdate(id, supplementDto, { new: true })
      .exec();
  }

  async findAll(): Promise<Supplement[]> {
    return this.supplementModel.find().exec();
  }

  async findOne(id: number): Promise<Supplement> {
    return this.supplementModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Supplement> {
    const supplement = await this.supplementModel.findOne({ name})
    return supplement;
  };
  async findRecommendations(id: string): Promise<Supplement[]> {
    const supplementName = (await this.supplementModel.findById(id)).name;
    const result = await this.neo4jService.read(
      `MATCH (s1:Supplement {supplementName ${supplementName}})<-[:ORDERED]-(u1:User)-[:ORDERED]->(s2:Supplement)
WHERE s2 <> s1
RETURN s2.name, count(u1) as users_ordered
ORDER BY users_ordered DESC`
    );
    const recommendations = result.records.map((record) => {
      return record.get('r').properties;
    });
    return recommendations;
  }

  async remove(id: string) {
    
    await this.neo4jService.write(
      `MATCH (s:Supplement {id: "${id}"}) DETACH DELETE s`
    )
    return this.supplementModel.findByIdAndRemove(id).exec();
  }
}
