import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot(),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '7d'},
  }),
],
  providers: [JwtStrategy, LocalStrategy, JwtAuthGuard, LocalAuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
