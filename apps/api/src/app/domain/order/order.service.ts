import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderDocument } from './order.schema';
import { OrderDto } from './order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
    constructor(
         @InjectModel(Order.name) private orderModel : Model<OrderDocument>,
    ) {
        console.log('OrderService: ', Order);
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOne(id: number): Promise<Order> {
        return this.orderModel.findById(id).exec();
    }

    async remove(id: string) {
        return this.orderModel.findByIdAndRemove(id).exec();
    }
}
