import { Module } from '@nestjs/common';
import { Supplement, SupplementSchema } from './supplement.schema';
import { SupplementService } from './supplement.service';
import { SupplementController } from './supplement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ReviewModule } from '../review/review.module';
import { Review, ReviewSchema } from '../review/review.schema';
import { User, UserSchema } from '../user/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplement.name, schema: SupplementSchema },
      { name: Review.name, schema: ReviewSchema},
      { name: User.name, schema: UserSchema}
    ]),
    Neo4jModule, AuthModule, UserModule, ReviewModule,
  ],
  providers: [
    SupplementService,
  ],
  controllers: [SupplementController],
})
export class SupplementModule {}
