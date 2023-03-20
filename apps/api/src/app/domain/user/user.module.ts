import {Module} from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { UserService} from './user.service';
import { UserController} from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from '../../Infrastructure/neo4j/neo4j.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), Neo4jModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})

export class UserModule {}