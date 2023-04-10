import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ReviewModule } from '../review/review.module';
import { Bundle, BundleSchema } from './bundle.schema';
import { Review, ReviewSchema } from '../review/review.schema';
import { User, UserSchema } from '../user/user.schema';
import { BundleController } from './bundle.controller';
import { BundleService } from './bundle.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bundle.name, schema: BundleSchema },
      { name: User.name, schema: UserSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
    Neo4jModule,
    AuthModule,
    UserModule,
    ReviewModule,
  ],
  controllers: [BundleController],
  providers: [BundleService],
})
export class BundleModule {}