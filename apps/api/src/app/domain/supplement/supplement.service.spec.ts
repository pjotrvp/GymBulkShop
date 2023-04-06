import { SupplementService } from './supplement.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { Supplement, SupplementSchema } from './supplement.schema';
import { Review, ReviewSchema } from '../review/review.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { SupplementModule } from './supplement.module';
import { Neo4jService } from '../../Infrastructure/neo4j/neo4j.service';
import {
  NEO4J_CONFIG,
  NEO4J_DRIVER,
} from '../../infrastructure/neo4j/neo4j.constants';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ReviewModule } from '../review/review.module';
import { OrderModule } from '../order/order.module';
import { Order, OrderSchema } from '../order/order.schema';
import { disconnect } from 'process';

describe('SupplementService', () => {
  let service: SupplementService;
  let userService: UserService;
  let memoryServer: MongoMemoryServer;
  let mongoClient: MongoClient;
  let neo4jService: Neo4jService;
  let authService: AuthService;
  let jwtToken: string;
  let currentUserId: string;
  let currentUser: User;
  let testSupplement5: Supplement;
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
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_TEST_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
        MongooseModule.forFeature([
          { name: Supplement.name, schema: SupplementSchema },
          { name: Review.name, schema : ReviewSchema},
          { name: Order.name, schema: OrderSchema}
        ]),
        SupplementModule,
        ReviewModule,
        OrderModule
      ],
      providers: [
        SupplementService,
        {
          provide: getModelToken(Supplement.name),
          useValue: Supplement,
        },
        Neo4jService,
        { provide: NEO4J_CONFIG, useValue: jest.fn() },
        { provide: NEO4J_DRIVER, useValue: jest.fn() },
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: User,
        },
        AuthService,
      ],
    }).compile();

    neo4jService = module.get<Neo4jService>(Neo4jService);
    service = module.get<SupplementService>(SupplementService);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    mongoClient = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();
  });
  beforeEach(async () => {
    const testUser = {
      name: 'Rebekka Passang',
      email: 'rebekkapassang@proton.me',
      password: '123456',
      reviews: [],
      orders: [],
      supplements: [],
      role: 'user',
    };
    await userService.create(testUser);
    jwtToken = (await authService.login(testUser)).access_token;
    currentUser = await userService.findOneByEmail(testUser.email);
    currentUserId = currentUser['_id'];
    await mongoClient.db().collection('supplements').deleteMany({});
    
  });

  describe('SupplementService', () => {
    const testSupplement = {
      name: 'Whey protein isolate myprotein',
      description: 'great protein powder from myprotein',
      supplementType: 'protein',
      containsLactose: true,
      isVegan: false,
      price: 10,
      flavours: ['chocolate', 'vanilla'],
      sizes: ['1kg', '2kg'],
      ingredients: ['whey protein isolate', 'soy lecithin'],
      image: 'test.png',
    };

    const testSupplementCopy = {
      name: 'Whey protein isolate myprotein',
      description: 'great protein powder from myprotein',
      supplementType: 'protein',
      containsLactose: true,
      isVegan: false,
      price: 10,
      flavours: ['chocolate', 'vanilla'],
      sizes: ['1kg', '2kg'],
      ingredients: ['whey protein isolate', 'soy lecithin'],
      image: 'test.png',
    };

    const testSupplement2 = {
      name: 'caffeine booster',
      description: '250 mg Caffeine Anhydrous per capsule',
      supplementType: 'pre-workout',
      containsLactose: false,
      isVegan: true,
      price: 9.99,
      flavours: ['unflavoured'],
      sizes: ['180 caps', '90 caps'],
      ingredients: ['cafeïne anhydrous', 'capsule shell'],
      image: 'test.png',
    };

    const testSupplement5 = {
      name: 'Whey protein isolate mysupps',
      description: 'great protein powder from mysupps',
      supplementType: 'protein',
      containsLactose: true,
      isVegan: false,
      price: 10,
      flavours: ['chocolate', 'vanilla'],
      sizes: ['1kg', '2kg'],
      ingredients: ['whey protein isolate', 'soy lecithin'],
      image: 'test.png',
    };

    const testReview = {
      title: 'Great product',
      description: 'I love this product',
      rating: 5,
    };

    const testUser2 = {
      name: 'Egídio Jens',
      email: 'egidio@proton.me',
      password: '123456rc',
      reviews: [],
      orders: [],
      supplements: [],
      role: 'user',
    };

    it('should create a supplement', async () => {
      const result = await service.create(testSupplement);
      expect(result.name).toEqual(testSupplement.name);
    });

    it('should create supplement(supplement already exists)', async () => {
      await service.create(testSupplement);
      await expect(service.create(testSupplementCopy)).rejects.toEqual(
        new BadRequestException('Supplement with this name already exists')
      );
    });

    it('should update a supplement', async () => {
      const supplement = await service.create(testSupplement);
      const result = await service.update(supplement['_id'], testSupplement2);
      expect(result.name).toEqual(testSupplement2.name);
    });


    it('should delete a supplement', async () => {
      const supplement = await service.create(testSupplement);
      await service.remove(supplement['_id']);
      const result = await service.findAll();
      expect(result).toHaveLength(0);
    });

    it('should return an array of supplements', async () => {
      await service.create(testSupplement);
      await service.create(testSupplement2);
      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].name).toEqual(testSupplement.name);
    });

    it('should return a supplement by id', async () => {
      const supplement = await service.create(testSupplement);
      const result = await service.findOne(supplement['_id']);
      expect(result.name).toEqual(testSupplement.name);
    });

    it('should return a supplement by name', async () => {
      const supplement = await service.create(testSupplement);
      const result = await service.findByName(supplement.name);
      expect(result.name).toEqual(testSupplement.name);
    });

    it('should return a supplement by id(supplement does not exist)', async () => {
      await service.create(testSupplement);
      await expect(service.findOne('6426900b98af64da68405b83')).rejects.toThrow(
        new NotFoundException(
          'Supplement with ID 6426900b98af64da68405b83 not found'
        )
      );
    });
  });

  afterEach(async () => {
    await mongoClient.db().collection('supplements').deleteMany({});
    await mongoClient.db().collection('users').deleteMany({});
  });

  afterAll(async () => {
    await mongoClient.close();
    await memoryServer.stop();
  });
});
