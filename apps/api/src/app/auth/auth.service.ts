import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/user/user.schema';
import { UserService } from '../domain/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    console.log('validateUser user: ', user)
    if(!user) throw new UnauthorizedException();
    if(!(await compare(pass, user.password)))
        throw new UnauthorizedException();

    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = {
      _id: user['_id'],
      name: user.name,
      sub: user.email,
      role: user.role,
    };
    return {
      _id: user['_id'],
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}
