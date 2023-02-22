import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    console.log('UserService: ', User);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate({ _id: id}, updateUserDto, { new: true }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id}).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
    .findByIdAndRemove({ _id: id})
    .exec();
    return deletedUser;
  }
}
