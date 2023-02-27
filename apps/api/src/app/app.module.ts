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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.yrmu0e7.mongodb.net/?retryWrites=true&w=majority'),
    // Neo4jModule.forRoot({
    //   scheme: 'neo4j',
    //   uri: 'neo4j+s://64541d6d.databases.neo4j.io',
    //   username: 'neo4j',
    //   password: 'neo',
    // }),
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

