import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { Neo4jService } from '../../infrastructure/neo4j/neo4j.service';
import {
  NEO4J_CONFIG,
  NEO4J_DRIVER,
} from '../../infrastructure/neo4j/neo4j.constants';
import { UserModule } from './user.module';
import { Order, OrderSchema } from '../order/order.schema';
import { BadRequestException } from '@nestjs/common';
describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserDocument>;
  let memoryServer: MongoMemoryServer;
  let mongoClient: MongoClient;
  let neo4jService: Neo4jService;
  beforeAll(async () => {
    let uri: string;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            memoryServer = await MongoMemoryServer.create();
            uri = memoryServer.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
        {name: Order.name, schema: OrderSchema}]),
        UserModule,
      ],
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: User },
        Neo4jService,
        { provide: NEO4J_CONFIG, useValue: jest.fn() },
        { provide: NEO4J_DRIVER, useValue: jest.fn() },
      ],
    }).compile();

    neo4jService = module.get<Neo4jService>(Neo4jService);
    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));

    mongoClient = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();
  });
  beforeEach(async () => {
    await mongoClient.db().collection('users').deleteMany({});
  });

  describe('UserService', () => {
    const testUser = {
      name: 'John',
      email: 'johndoe@gmail.com',
      password: 'JohnDoe123',
      role: 'user',
      reviews: [],
      orders: [],
    };

    const testUser2 = {
      name: 'Birgit',
      email: 'birgit@aaliass.com',
      password: 'Birgit123',
      role: 'user',
      reviews: [],
      orders: [],
    };

    const updateUser = {
      name: 'Jack',
      email: 'jacktheripper@me.me',
      password: 'Jack123',
      role: 'user',
      reviews: [],
      orders: [],
    };

    const testAdmin = {
      username: 'administrato',
      email: 'jacktheadmin@google.com',
      password: 'Admin123',
      role: 'admin',
      reviews: [],
      orders: [],
    };

    const currentUser = {
      name: 'John',
      email: 'johnthereaper@me.com',
      password: 'John123',
      role: 'user',
      reviews: [],
      orders: [],
    };

    it('should return an array of users', async () => {
      await service.create(testUser);
      await service.create(testUser2);
      const result = await service.findAll();
      expect(result.length).toEqual(2);
      expect(result[0].name).toEqual(testUser.name);
    });

    it('should create one user', async () => {
      const createdUser = await service.create(testUser);
      const result = await service.findOne(createdUser['_id']);
      expect(result.name).toEqual(testUser.name);
    });

    it('should create one user (user already exists)', async () => {
      await service.create(testUser);
      await expect(service.create(testUser)).rejects.toEqual(
        new BadRequestException('User already exists')
      );
    })

    it('findOne invalid object id should return User not found error', async () => {
      try {
        await service.findOne('a');
      } catch (error) {
        expect(error.name).toEqual('NotFoundException');
        expect(error.message).toEqual('User not found');
      }
    });

    it('find not existing user should return User not found error', async () => {
      try {
        await service.findOne('63bff6db14ccf4c24dab1e3c');
      } catch (error) {
        expect(error.name).toEqual('NotFoundException');
        expect(error.message).toEqual('User not found');
      }
    });

    it('should update one user', async () => {
      const createdUser = await service.create(testUser);
      const result = await service.update(createdUser['_id'], updateUser);
      expect(result.name).toEqual(updateUser.name);
    });

    it('should delete one user', async () => {
      const createdUser = await service.create(testUser);
      const result = await service.remove(createdUser['_id']);
      expect(result.name).toEqual(testUser.name);
    });
  });

  afterAll(async () => {
    await mongoClient.close();
    await memoryServer.stop();
  });
});
