import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Kit, KitDocument } from './kit.schema';
import { KitDto } from './kit.dto';
@Injectable()
export class KitService {
  constructor(@InjectModel(Kit.name) private kitModel: Model<KitDocument>) {
    console.log('KitService: ', Kit);
  }

  async create(kitDto: KitDto): Promise<Kit> {
    const createdKit = new this.kitModel(kitDto);
    return createdKit.save();
  }

  async edit(id: string, kitDto: KitDto): Promise<Kit> {
    return this.kitModel.findByIdAndUpdate(id, kitDto, { new: true }).exec();
  }

  async findAll(): Promise<Kit[]> {
    return this.kitModel.find().exec();
  }

  async findOne(id: number): Promise<Kit> {
    return this.kitModel.findById(id).exec();
  }

  async remove(id: string) {
    return this.kitModel.findByIdAndRemove(id).exec();
  }
}
