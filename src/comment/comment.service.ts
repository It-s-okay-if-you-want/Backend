import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from 'src/entities/Comment';
import User from 'src/entities/User';
import AddCommentDto from './dto/addComment.dto';
import { AuthService } from 'src/auth/auth.service';
import Post from 'src/entities/Post';
import { PostService } from 'src/post/post.service';
import Ban from 'src/entities/Ban';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private commentRepo: Repository<Comment>,
		private userService: AuthService,
		private postService: PostService,
		@InjectRepository(Ban)
		private banRepo: Repository<Ban>,
	) { }

	public async addComment(user: User, commentDto: AddCommentDto, idx: number): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const postData: Post = await this.postService.getPost(idx);

		const comment: Comment = this.commentRepo.create(commentDto);
		comment.user = userData;
		comment.post = postData;

		await this.commentRepo.save(comment);
	}

	public async deleteComment(user: User, idx: number): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const comment: Comment | undefined = await this.commentRepo.findOne({
			where: {
				idx: idx,
			}
		});

		if (comment === undefined) {
			throw new NotFoundException('존재하지 않는 댓글');
		}

		if (comment.user !== userData) {
			throw new UnauthorizedException('권한이 없습니다');
		}


	}
}
