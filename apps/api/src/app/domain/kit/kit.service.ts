import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Kit, KitDocument } from './kit.schema';

@Injectable()
export class KitService {
    constructor(
        @InjectModel(Kit.name) private kitModel: Model<KitDocument>,
    ) {
        console.log('KitService: ', Kit);
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