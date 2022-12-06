import { Injectable } from '@nestjs/common';
import { Supplement, SupplementDocument } from './supplement.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SupplementDto } from './supplement.dto';

@Injectable()
export class SupplementService {
  constructor(
    @InjectModel(Supplement.name)
    private supplementModel: Model<SupplementDocument>
  ) {
    console.log('SupplementService: ', Supplement);
  }
  async create(supplementDto: SupplementDto): Promise<Supplement> {
    const createdSupplement = new this.supplementModel(supplementDto);
    return createdSupplement.save();
  }

  async edit(id: string, supplementDto: SupplementDto): Promise<Supplement> {
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

  async remove(id: string) {
    return this.supplementModel.findByIdAndRemove(id).exec();
  }
}
