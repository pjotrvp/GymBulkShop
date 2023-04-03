import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';
import { UserModule } from '../user/user.module';
@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    Neo4jModule,
UserModule],
    providers: [OrderService],
    controllers: [OrderController],
})

export class OrderModule {}