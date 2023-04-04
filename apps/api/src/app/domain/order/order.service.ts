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
  ) {
    console.log('OrderService: ', Order);
  }

  
}
