import { Injectable } from '@nestjs/common';
import { bcrypt } from 'bcrypt';
import { UserService } from '../domain/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}
    
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }
}
