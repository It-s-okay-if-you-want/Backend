import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import Comment from 'src/entities/Comment';
import User from 'src/entities/User';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';
import { PostService } from 'src/post/post.service';
import Post from 'src/entities/Post';
import PostLike from 'src/entities/PostLike';
import PostVote from 'src/entities/PostVote';
import CommentVote from 'src/entities/CommentVote';
import Ban from 'src/entities/Ban';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post, PostLike, CommentVote, Ban])],
  controllers: [CommentController],
  providers: [CommentService, AuthService, TokenService, PostService]
})
export class CommentModule { }
