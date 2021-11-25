import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import PostEntity from 'src/entities/Post';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import CreatePostDto from './dto/create.dto';
import UpdatePostDto from './dto/update.dto';
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
	@ApiBasicAuth()
	async CreatePost(@Body() postDto: CreatePostDto, @Token() user: User) {
		await this.postService.createPost(postDto, user);

		return new BaseResponse(200, "글 작성 성공");
	}

	@UseGuards(AuthGuard)
	@Get('/new')
	@HttpCode(200)
	@ApiOkResponse({ type: GetPostsResponse })
	@ApiBasicAuth()
	async getNewPost(@Token() user: User) {
		const posts: PostEntity[] = await this.postService.getNewPost(user);

		return new GetPostsResponse(200, "최신순 정렬", posts);
	}

	@UseGuards(AuthGuard)
	@Get('/hot')
	@HttpCode(200)
	@ApiOkResponse({ type: GetPostsResponse })
	@ApiBasicAuth()
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

	@UseGuards(AuthGuard)
	@Delete('/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async deletePost(@Param('idx') idx: number, @Token() user: User) {
		await this.postService.deletePost(idx, user);

		return new BaseResponse(200, '삭제 성공');
	}

	@UseGuards(AuthGuard)
	@Put('/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async updatePost(@Param('idx') idx: number, @Token() user: User, @Body() updateDto: UpdatePostDto) {
		await this.postService.updatePost(idx, user, updateDto);

		return new BaseResponse(200, "글 수정 성공");
	}

	@UseGuards(AuthGuard)
	@Get('/category/:category')
	@HttpCode(200)
	@ApiOkResponse({ type: GetPostsResponse })
	@ApiBasicAuth()
	async getPostByCategory(@Param('category') category: number, @Token() user: User) {
		const posts: PostEntity[] = await this.postService.getPostByCategory(user, category);

		return new GetPostsResponse(200, '카테고리별 글 조회 성공', posts);
	}

	@UseGuards(AuthGuard)
	@Post('/like/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async addLike(@Token() user: User, @Param('idx') idx: number) {
		await this.postService.addLike(user, idx);

		return new BaseResponse(200, '좋아요');
	}
}