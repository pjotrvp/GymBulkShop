import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { Review } from '../domain/review/review.schema';
import { CreateUserDto } from '../domain/user/dto/createUser.dto';
import { User, UserDocument, UserSchema } from '../domain/user/user.schema';
import { UserService } from '../domain/user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { disconnect } from 'process';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let memoryServer: MongoMemoryServer;
  let mongoClient: MongoClient;

  let userModel: Model<UserDocument>;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: { create: jest.fn(), findOneByEmail: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<UserDocument>>(User.name + 'Model');
    await userModel.ensureIndexes();
    mongoClient = new MongoClient(uri, { useUnifiedTopology: true });
    await mongoClient.connect();
  });

  const testUserDto: CreateUserDto = {
    name: 'Freek4',
    email: 'Freek31@proton.me',
    password: 'strongPassword2',
    
  };

  const testUser: User = {
    name: testUserDto.name,
    email: testUserDto.email,
    password: testUserDto.password,
    role: 'user',
    reviews: [],
    orders: [],
    supplements: [],
  };

  beforeEach(async () => {
    await mongoClient.db('test').collection('users').deleteMany({});
    jest
      .spyOn(userService, 'create')
      .mockImplementation((_u: CreateUserDto) => Promise.resolve(testUser));
    await userService.create(testUserDto);
    jest
      .spyOn(userService, 'findOneByEmail')
      .mockImplementation((_e: string) =>
        Promise.resolve({ _id: '123', ...testUser })
      );
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((_p: string, _h: string) => Promise.resolve(true));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return a valid token when logging in', async () => {
    const user = await userService.findOneByEmail(testUser.email);
    jest.spyOn(jwtService, 'sign').mockImplementation((_p: object) => 'token');

    const response = await authService.login(user);
    const payload = {
      _id: user['_id'],
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = jwtService.sign(payload);
    expect(response.access_token).toEqual(token);
  });

  it('should validate user (user does not exist)', async () => {
    try {
      await authService.validateUser(
        'thismaildoesnotexist@proton.me',
        'qwerty6'
      );
    } catch (e) {
      expect(e.message).toEqual('Unauthorized');
    }
  });

  it('should validate user (user wrong password)', async () => {
    const user = await userService.findOneByEmail(testUser.email);
    try {
      await authService.validateUser(user.email, 'qwert6');
    } catch (e) {
      expect(e.message).toEqual('Unauthorized');
    }
  });

  it('should validate user', async () => {
    const user = await userService.findOneByEmail(testUser.email);
    const response = await authService.validateUser(user.email, user.password);
    const result = user;
    delete result.password
    expect(response).toEqual(result);
  })

  afterAll(async () => {
    await mongoClient.close();
    await memoryServer.stop();
  });
});
