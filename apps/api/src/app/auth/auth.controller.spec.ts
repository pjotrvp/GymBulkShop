import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../domain/user/dto/createUser.dto';
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

  describe('register', () => {
    let exampleUser, exampleId, register;

    beforeEach(() => {
      exampleUser = {
        username: 'Bart',
        password: 'supergeheim124',
        email: 'Bart@proton.me',
      };
      exampleId = 'id123';
    });

    it('should call the register and create method of the auth service on success', async () => {
      register = jest
        .spyOn(userService, 'create')
        .mockImplementation(async (_user: CreateUserDto) => {
          exampleUser._id = exampleId;
          return exampleUser;
        });

      const user = await authController.register(exampleUser);

      expect(register).toHaveBeenCalledWith(exampleUser);
      expect(user).toHaveProperty('_id', exampleId);
    });

    it('should not call create on failed register (duplicate username)', async () => {
      register = jest
        .spyOn(userService, 'create')
        .mockImplementation(async (_user: CreateUserDto) => {
          throw new BadRequestException('Registration failed');
        });

      await expect(authController.register(exampleUser)).rejects.toThrow();
    });


  });
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
