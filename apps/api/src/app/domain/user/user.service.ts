import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {
    console.log('UserService: ', User);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    this.neo4jService.write(
      `CREATE (u:User {name: "${createdUser.name}", id: "${createdUser._id}"}) RETURN u`
    );
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    await this.neo4jService.write(
      `MATCH (u:User {id: "${id}"}) DETACH DELETE u`
    );
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
