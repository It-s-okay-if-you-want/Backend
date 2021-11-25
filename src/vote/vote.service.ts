import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { AuthService } from 'src/auth/auth.service';
import { CommentService } from 'src/comment/comment.service';
import Ban from 'src/entities/Ban';
import CommentVote from 'src/entities/CommentVote';
import Post from 'src/entities/Post';
import PostVote from 'src/entities/PostVote';
import User from 'src/entities/User';
import { GroupService } from 'src/group/group.service';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(PostVote)
    private postVoteRepository: Repository<PostVote>,
    @InjectRepository(CommentVote)
    private commentReportRepository: Repository<CommentVote>,
    private userService: AuthService,
    private postService: PostService,
    private groupService: GroupService,
    private commentService: CommentService,
    @InjectRepository(Ban)
    private banRepository: Repository<Ban>
  ) { }

  public async addPostVote(idx: number, user: User, agree: boolean): Promise<void> {
    const userData: User = await this.userService.getUserById(user.id);

    const postData: Post = await this.postService.getPost(idx);

    const vote: PostVote = this.postVoteRepository.create({
      user: userData,
      post: postData,
      agree: agree
    });


    const voteList: PostVote[] = await this.postVoteRepository.find({
      where: {
        post: postData
      }
    });

    if (voteList.length <= 10) {
      await this.postVoteRepository.save(vote);
    }

    if (voteList.length >= 10) {
      const banUser: User = await this.userService.getUserById(postData.userId);

      const isBan: Ban = await this.banRepository.findOne({
        where: {
          user: banUser
        }
      });

      if (isBan !== undefined) {
        throw new BadRequestException('이미 제재된 유저입니다');
      }

      const ban: Ban = this.banRepository.create({
        user: banUser,
        startDate: dayjs().format('YYYY-MM-DD'),
        endDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
      });
      await this.banRepository.save(ban);
    }
  }
}