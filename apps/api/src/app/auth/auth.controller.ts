import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../domain/user/dto/createUser.dto';
import { User } from '../domain/user/user.schema';
import { UserService } from '../domain/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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

    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

}