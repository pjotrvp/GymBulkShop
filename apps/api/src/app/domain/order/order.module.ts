import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';
import { UserSchema } from '../user/user.schema';
import { Product, ProductSchema } from '../product/product.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, { name: 'User', schema: UserSchema }, { name: 'Product', schema: ProductSchema }]),
    Neo4jModule,
],
    providers: [OrderService],
    exports: [OrderService]
})

export class OrderModule {}