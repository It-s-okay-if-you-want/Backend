import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CommentService } from 'src/comment/comment.service';
import CommentReport from 'src/entities/CommentReport';
import Post from 'src/entities/Post';
import PostReport from 'src/entities/PostReport';
import User from 'src/entities/User';
import Comment from 'src/entities/Comment';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import Ban from 'src/entities/Ban';
import * as day from 'dayjs';

@Injectable()
export class ReportService {
	constructor(
		@InjectRepository(PostReport)
		private postReportRepo: Repository<PostReport>,
		@InjectRepository(CommentReport)
		private commentReportRepo: Repository<CommentReport>,
		private userService: AuthService,
		private postService: PostService,
		private commentService: CommentService,
		@InjectRepository(Ban)
		private banRepo: Repository<Ban>
	) { }

	public async addPostReport(user: User, idx: number): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const postData: Post = await this.postService.getPost(idx);

		const report: PostReport | undefined = await this.postReportRepo.findOne({
			where: {
				user: userData,
				post: postData
			}
		});

		if (report !== undefined) {
			throw new ForbiddenException('이미 섭섭해요를 눌렀어요');
		}

		const postReport: PostReport = this.postReportRepo.create();
		postReport.user = userData;
		postReport.post = postData;

		await this.postReportRepo.save(postReport);
	}

	public async deletePostReport(user: User, idx: number) {
		const userData: User = await this.userService.getUserById(user.id);

		const postData: Post = await this.postService.getPost(idx);

		const report: PostReport | undefined = await this.postReportRepo.findOne({
			where: {
				user: userData,
				post: postData
			}
		});

		if (report === undefined) {
			throw new NotFoundException('섭섭해요를 누르지 않았어요');
		}

		await this.postReportRepo.remove(report);
	}

	public async addCommentReport(user: User, idx: number): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const commentData: Comment = await this.commentService.getComment(idx);

		const report: CommentReport | undefined = await this.commentReportRepo.findOne({
			where: {
				user: userData,
				comment: commentData
			}
		});

		if (report !== undefined) {
			throw new ForbiddenException('이미 섭섭해요를 눌렀어요');
		}

		const commentReport: CommentReport = this.commentReportRepo.create();
		commentReport.user = userData;
		commentReport.comment = commentData;

		await this.commentReportRepo.save(commentReport);

		const reportList: CommentReport[] = await this.commentReportRepo.find({
			where: {
				comment: commentData
			}
		});

		if (reportList.length >= 10) {
			const banUser: User = await this.userService.getUserById(commentReport.comment.user.id);

			const ban: Ban = this.banRepo.create({
				user: banUser,
				startDate: day().format('YYYY-MM-DD'),
				endDate: day().add(7, 'day').format('YYYY-MM-DD')
			});
			await this.banRepo.save(ban);
		}
	}

	public async deleteCommentReport(user: User, idx: number) {
		const userData: User = await this.userService.getUserById(user.id);

		const commentData: Comment = await this.commentService.getComment(idx);

		const report: CommentReport | undefined = await this.commentReportRepo.findOne({
			where: {
				user: userData,
				comment: commentData
			}
		});

		if (report === undefined) {
			throw new NotFoundException('섭섭해요를 누르지 않았어요');
		}

		await this.commentReportRepo.remove(report);
	}
}
