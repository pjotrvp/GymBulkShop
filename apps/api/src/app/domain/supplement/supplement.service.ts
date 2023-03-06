import { Injectable } from '@nestjs/common';
import { Supplement, SupplementDocument } from './supplement.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSupplementDto } from './dto/createSupplement.dto';
import { UpdateSupplementDto } from './dto/updateSupplement.dto';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';


@Injectable()
export class SupplementService {
  constructor(
    @InjectModel(Supplement.name)
    private supplementModel: Model<SupplementDocument>,
    private readonly neo4jService: Neo4jService,
    


  ) {
    console.log('SupplementService: ', Supplement);
  }
  async create(supplementDto: CreateSupplementDto): Promise<Supplement> {
    const createdSupplement = new this.supplementModel(supplementDto);
    await this.neo4jService.write(
      `CREATE (s:Supplement {name: "${createdSupplement.name}", createdBy: "${createdSupplement.createdBy}", id: "${createdSupplement._id}"}) MERGE (u:User {id: "${createdSupplement.createdBy}"}) MERGE (u)-[:CREATED]->(s) RETURN s`
    );
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
