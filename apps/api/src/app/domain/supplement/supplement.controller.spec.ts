import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
import { SupplementController } from './supplement.controller';
import {
  Supplement,
  SupplementDocument,
  SupplementSchema,
} from './supplement.schema';
import { SupplementService } from './supplement.service';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SupplementModule } from './supplement.module';
import {
  NEO4J_CONFIG,
  NEO4J_DRIVER,
} from '../../Infrastructure/neo4j/neo4j.constants';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { Review, ReviewSchema } from '../review/review.schema';
import { ReviewModule } from '../review/review.module';
import { OrderModule } from '../order/order.module';
import { Order, OrderSchema } from '../order/order.schema';
describe('SupplementController', () => {
  let controller: SupplementController;
  let supplementModel: Model<SupplementDocument>;
  let service: SupplementService;
  let userService: UserService;
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
        MongooseModule.forFeature([
          { name: Supplement.name, schema: SupplementSchema },
          { name: Review.name, schema: ReviewSchema },
          { name: Order.name, schema: OrderSchema},
        ]),
        SupplementModule,
        ReviewModule,
        OrderModule
      ],
      controllers: [SupplementController],
      providers: [
        SupplementService,
        { provide: getModelToken(Supplement.name), useValue: Supplement },
        Neo4jService,
        { provide: NEO4J_CONFIG, useValue: jest.fn() },
        { provide: NEO4J_DRIVER, useValue: jest.fn() },
        UserService,
        { provide: getModelToken(User.name), useValue: User },
      ],
    }).compile();

    controller = module.get<SupplementController>(SupplementController);
    neo4jService = module.get<Neo4jService>(Neo4jService);
    service = module.get<SupplementService>(SupplementService);
    userService = module.get<UserService>(UserService);
    supplementModel = module.get<Model<SupplementDocument>>(
      getModelToken(Supplement.name)
    );
    mongoClient = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();
  });
  beforeEach(async () => {
    await mongoClient.db().collection('supplements').deleteMany({});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await mongoClient.close();
    await memoryServer.stop();
  });
});
