import {Module} from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { UserService} from './user.service';
import { UserController} from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserService],
    controllers: [UserController],
})

export class UserModule {}