import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, Request } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, ObjectId, Types } from 'mongoose';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
import { OrderDto } from '../order/dto/order.dto';
import { Order, OrderDocument } from '../order/order.schema';
import { REQUEST } from '@nestjs/core';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly neo4jService: Neo4jService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(userDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }
    const role = user;
    const createdUser = new this.userModel(userDto, role);

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
    const userId = this.request['user']['_id'];
    const user = await this.userModel.findById(userId).exec()
    if(!user) {
      throw new NotFoundException('no current user available');
    }
    return user;
  }

  async getCurrentId(): Promise<ObjectId> {
    const userId = this.request['user']['_id'];
    if(!userId) {
      throw new NotFoundException('no current user available');
    }
    return userId;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.neo4jService.write(
      `MATCH (u:User {id: "${id}"}) DETACH DELETE u`
    );

    return user.delete();
  }

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(orderDto);
    await this.neo4jService.write(
      `MATCH (u:User {id: $userId}), (s:Supplement {id: $supplementId}))
      CREATE (u)-[:ORDERED]->(s)`
    );
    return createdOrder.save();
  }

  async updateOrder(id: string, orderDto: OrderDto): Promise<Order> {
    const currentUserId = await this.getCurrentId();
    const order = await this.orderModel.findById(id);
    const orderObject = order.toObject();
    const createdById = orderObject.createdById.toString()

    if (new Types.ObjectId(createdById).toString() !== currentUserId.toString()) {
      throw new HttpException(
        'Can only edit owned orders',
        HttpStatus.FORBIDDEN
      );
    }
    return this.orderModel
      .findByIdAndUpdate(id, orderDto, { new: true })
      .exec();
  }

  async findAllOrder(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOneOrder(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async removeOrder(id: string) {
    const currentUserId = await this.getCurrentId();
    const order = await this.orderModel.findById(id);
    const orderObject = order.toObject();
    const createdById = orderObject.createdById.toString();

    if (
      new Types.ObjectId(createdById).toString() !== currentUserId.toString()
    ) {
      throw new HttpException(
        'Can only edit owned orders',
        HttpStatus.FORBIDDEN
      );
    }
    await this.neo4jService.write(
      `MATCH (s:Supplement {id: "${id}"}) DETACH DELETE s`
    );
    return this.orderModel.findByIdAndRemove(id).exec();
  }
}
