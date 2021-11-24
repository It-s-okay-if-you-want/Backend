import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import CatchException from './interceptor/error.interceptor';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule { }
