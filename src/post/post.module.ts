import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from 'src/entities/Post';
import { TokenService } from 'src/token/token.service';
import { AuthService } from 'src/auth/auth.service';
import User from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostService, TokenService, AuthService],
  controllers: [PostController]
})
export class PostModule { }
