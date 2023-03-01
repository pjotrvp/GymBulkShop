import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SupplementModule } from './domain/supplement/supplement.module';
import { UserModule } from './domain/user/user.module';
import { ReviewModule } from './domain/review/review.module';
import { OrderModule } from './domain/order/order.module';
import { KitModule } from './domain/kit/kit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI,
    ),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_HOST,
      port: process.env.NEO4J_PORT,
      username: process.env.NEO4J_USER,
      password: process.env.NEO4J_PASSWORD,
      // database: process.env.NEO4J_DATABASE,
    }),
    SupplementModule,
    AuthModule,
    UserModule,
    ReviewModule,
    OrderModule,
    KitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 
}
