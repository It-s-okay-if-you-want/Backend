import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import CatchException from './interceptor/error.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormConfig';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, TokenModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule { }
