import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from 'nest-neo4j';
describe('UserService', () => {
    let service: UserService;
    let userModel: Model<UserDocument>;
    let memoryServer: MongoMemoryServer;
    let mongoClient: MongoClient;

    beforeAll(async () => {
        let uri: string;

        const module: TestingModule = await Test.createTestingModule({
            imports: [MongooseModule.forRootAsync({
                useFactory: async () => {
                    memoryServer = new MongoMemoryServer();
                    uri = await memoryServer.getUri();
                    return { uri };
                }
            }),
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
            Neo4jModule.forRoot({
                scheme: 'neo4j',
                host: 'localhost',
                port: 7687,
                username: 'neo4j',
                password: 'password',
            }),
        ],
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
        userModel = module.get('UserModel');

        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
    });
    beforeEach(async () => {
        await mongoClient.db().collection('users').deleteMany({});
    })
    afterAll(async () => {
        await mongoClient.close();
        await memoryServer.stop();
    });

    describe('UserService', () => {
        const testUser = {
            name: 'John',
            email: 'johndoe@gmail.com',
            password: 'JohnDoe123',
            role: 'user',
            reviews: [],
            orders: []
        };

        const testUser2 = {
            name: 'Birgit',
            email: 'birgit@aaliass.com',
            password: 'Birgit123',
            role: 'user',
            reviews: [],
            orders: []
        };

        const updateUser = {
            name: 'Jack',
            email: 'jacktheripper@me.me',
            password: 'Jack123',
            role: 'user',
            reviews: [],
            orders: []
        };

        const testAdmin = {
            username: 'administrato',
            email: 'jacktheadmin@google.com',
            password: 'Admin123',
            role: 'admin',
            reviews: [],
            orders: []
        }

        const currentUser = {
            name: 'John',
            email: 'johnthereaper@me.com',
            password: 'John123',
            role: 'user',
            reviews: [],
            orders: []
        };

        it('should return an array of users', async () => {
            await userModel.create(testUser);
            await userModel.create(testUser2);
            const result = await service.findAll();
            expect(result.length).toEqual(2);
            expect(result[0].name).toEqual(testUser.name);
        });
    })
}

)