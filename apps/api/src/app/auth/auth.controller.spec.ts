import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../domain/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
describe('AuthController', () => {
  let app: TestingModule;
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
