import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostReport from 'src/entities/PostReport';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TokenService } from 'src/token/token.service';
import CommentReport from 'src/entities/CommentReport';
import { AuthService } from 'src/auth/auth.service';
import User from 'src/entities/User';
import { PostService } from 'src/post/post.service';
import Post from 'src/entities/Post';
import PostLike from 'src/entities/PostLike';
import { CommentService } from 'src/comment/comment.service';
import Comment from 'src/entities/Comment';
import CommentVote from 'src/entities/CommentVote';
import Ban from 'src/entities/Ban';

@Module({
  imports: [TypeOrmModule.forFeature([PostReport, CommentReport, User, Post, PostLike, Comment, CommentVote, Ban])],
  controllers: [ReportController],
  providers: [ReportService, TokenService, AuthService, PostService, CommentService]
})
export class ReportModule { }
