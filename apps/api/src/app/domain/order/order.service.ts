import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderDocument } from './order.schema';
import { OrderDto } from './dto/order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Neo4jService } from 'nest-neo4j/dist/neo4j.service';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly neo4jService: Neo4jService,
    private readonly userService: UserService
  ) {
    console.log('OrderService: ', Order);
  }

  async create(orderDto: OrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(orderDto);
    await this.neo4jService.write(
      `MATCH (u:User {id: $userId}), (s:Supplement {id: $supplementId}))
      CREATE (u)-[:ORDERED]->(s)`
    );
    return createdOrder.save();
  }

  async update(id: string, orderDto: OrderDto): Promise<Order> {
    const currentUserId = await this.userService.getCurrentId();
    const orderCreatedById = (await this.orderModel.findById(id))
      .createdById;

    if (currentUserId !== orderCreatedById) {
      throw new HttpException(
        'Can only edit owned orders',
        HttpStatus.FORBIDDEN
      );
    }
    return this.orderModel
      .findByIdAndUpdate(id, orderDto, { new: true })
      .exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async remove(id: string) {
    const currentUserId = await this.userService.getCurrentId();
    const orderCreatedById = (await this.orderModel.findById(id))
      .createdById;

    if (currentUserId !== orderCreatedById) {
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
