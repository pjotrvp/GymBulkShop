import { Injectable } from '@nestjs/common';
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
    console.log('SupplementService: ', Supplement);
  }
  async create(supplementDto: CreateSupplementDto): Promise<Supplement> {
    const currentUser = this.userService.getCurrent();
    supplementDto.createdBy = currentUser['_id'];
    const createdSupplement = new this.supplementModel(supplementDto);
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

  async edit(id: string, supplementDto: UpdateSupplementDto): Promise<Supplement> {
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

  async findRecommendations(id: string): Promise<Supplement[]> {
    const result = await this.neo4jService.read(
      `MATCH (s:Supplement {id: "${id}"})-[:RECOMMENDED]->(r:Supplement) RETURN r`
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
