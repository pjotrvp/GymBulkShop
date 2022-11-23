import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type Users = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john@john.com',
      password: 'changeme123',
      role: 'admin',
      created_at: new Date(2019, 1, 1),
        updated_at: new Date(2021, 12, 31),
    },
    {
      userId: 2,
      email: 'maria@avans.nl',
      password: 'guess123',
        role: 'user',
        created_at: new Date(2020, 1, 1),
        updated_at: new Date(2022, 1, 1),
    },
  ];

  async findOne(email: string): Promise<Users | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
