import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import CatchException from './interceptor/error.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormConfig';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { GroupModule } from './group/group.module';
import { UploadModule } from './upload/upload.module';
import { VoteModule } from './vote/vote.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, TokenModule, PostModule, CommentModule, GroupModule, UploadModule, VoteModule, ReportModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule { }
