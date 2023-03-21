import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {
    console.log('UserService: ', User);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(userDto.email);

    if(user) {
      throw new BadRequestException('User already exists');
    }

    const createdUser = new this.userModel(userDto);

    createdUser.password = await hash(
      createdUser.password,
      parseInt(process.env.SALT_ROUNDS, 10)
    );
    this.neo4jService.write(
      `CREATE (u:User {name: "${createdUser.name}", id: "${createdUser._id}"}) RETURN u`
    );
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0, __v: 0 });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.neo4jService.write(
      `MATCH (u:User {id: "${id}"}) SET u.name = "${updateUserDto.name}" RETURN u`
    );
    return this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userModel
      .findById(id, {
        password: 0,
      })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getCurrent(): Promise<User> {
    const user = await this.userModel.findOne({ current : true});
    if(!user) {
      throw new NotFoundException('No current user available');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    //No need to check if the user exists, because this function is used by the login function
    //If we were to check if the user exists, users of the system would be able to check if a user exists
    return this.userModel.findOne({ email });
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if(!user) {
      throw new NotFoundException('User not found');
    }
    await this.neo4jService.write(
      `MATCH (u:User {id: "${id}"}) DETACH DELETE u`
    );
    
    return user.delete();
  }
}
