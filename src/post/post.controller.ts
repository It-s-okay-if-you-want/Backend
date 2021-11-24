import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import CreatePostDto from './dto/create.dto';
import { PostService } from './post.service';

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
}
