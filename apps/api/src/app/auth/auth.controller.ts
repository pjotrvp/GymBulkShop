import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../domain/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Req() req,
    ): Promise<{
        access_token: string;
        name: string;
        email: string;
        role: string;
    }> {
        return this.authService.login(req.user);
    }
}