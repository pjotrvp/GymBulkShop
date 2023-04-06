import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  constructor(protected override http: HttpClient) {
    super(environment.apiUrl, http, 'user');
  }

  readonly users: User[] = [
    {
      _id: '1',
      username: 'John',
      email: 'John@email.com',
      password: 'LOLOLOLOL',
    },
    {
      _id: '2',
      username: 'Sven',
      email: 'Sven@email.com',
      password: 'LOLOLOLOL',
    },
    {
      _id: '3',
      username: 'Thijs',
      email: 'Thijs@email.com',
      password: 'LOLOLOLOL',
    },
    {
      _id: '4',
      username: 'Arnold',
      email: 'Arnold@email.com',
      password: 'LOLOLOLOL',
    },
    {
      _id: '5',
      username: 'Ronnie',
      email: 'Ronnie@email.com',
      password: 'LOLOLOLOL',
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    return this.users.find((user) => user._id === id)!;
  }

  updateUser(user: User): void {
    const index = this.users.findIndex((u) => u._id === user._id);
    this.users[index] = user;
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((u) => u._id === id);
    this.users.splice(index, 1);
  }
}
