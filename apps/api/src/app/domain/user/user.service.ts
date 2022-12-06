import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel : Model<UserDocument>,
    ) {
        console.log('UserService: ', User);
    }
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: number): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async remove(id: string): Promise<void> {
        await this.userModel.findByIdAndRemove(id).exec();
    }
}