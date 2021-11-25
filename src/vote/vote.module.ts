import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostVote from 'src/entities/PostVote';
import CommentVote from 'src/entities/CommentVote';
import User from 'src/entities/User';
import Post from 'src/entities/Post';
import Group from 'src/entities/Group';
import PostLike from 'src/entities/PostLike';
import Ban from 'src/entities/Ban';
import Comment from 'src/entities/Comment';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';
import { PostService } from 'src/post/post.service';
import { GroupService } from 'src/group/group.service';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostVote, CommentVote, User, Post, Group, PostLike, Comment, Ban])],
  providers: [VoteService, AuthService, TokenService, PostService, GroupService, CommentService],
  controllers: [VoteController]
})
export class VoteModule { }
