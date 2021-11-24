import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  exports: [AuthModule]
})
export class AuthModule { }
