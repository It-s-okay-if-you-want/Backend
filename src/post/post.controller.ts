import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import PostEntity from 'src/entities/Post';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import CreatePostDto from './dto/create.dto';
import { PostService } from './post.service';
import { GetPostResponse, GetPostsResponse } from './response/PostResponse';

@Controller('post')
export class PostController {
	constructor(
		private postService: PostService,
	) { }

	@UseGuards(AuthGuard)
	@Post('/')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	async CreatePost(@Body() postDto: CreatePostDto, @Token() user: User) {
		await this.postService.createPost(postDto, user);

		return new BaseResponse(200, "글 작성 성공");
	}

	@UseGuards(AuthGuard)
	@Get('/new')
	@HttpCode(200)
	@ApiOkResponse({ type: GetPostsResponse })
	async getNewPost(@Token() user: User) {
		const posts: PostEntity[] = await this.postService.getNewPost(user);

		return new GetPostsResponse(200, "최신순 정렬", posts);
	}

	@UseGuards(AuthGuard)
	@Get('/hot')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	async getHotPost(@Token() user: User) {
		const posts: PostEntity[] = await this.postService.getHotPost(user);

		return new GetPostsResponse(200, "인기순 정렬", posts);
	}

	@Get('/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: GetPostResponse })
	async getPost(@Param('idx') idx: number) {
		const post: PostEntity = await this.postService.getPost(idx);

		return new GetPostResponse(200, '글 조회 성공', post);
	}
}
