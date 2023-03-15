import { Controller } from '@nestjs/common';
import { UserService } from '../domain/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}
}