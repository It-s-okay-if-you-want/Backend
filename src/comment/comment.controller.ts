import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import { CommentService } from './comment.service';
import AddCommentDto from './dto/addComment.dto';

@Controller('comment')
export class CommentController {
	constructor(
		private commentService: CommentService,
	) { }

	@UseGuards(AuthGuard)
	@Post('/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async addComment(@Token() user: User, @Body() addCommentDto: AddCommentDto, @Param('idx') idx: number) {
		await this.commentService.addComment(user, addCommentDto, idx);

		return new BaseResponse(200, "댓글 작성 성공");
	}

	@UseGuards(AuthGuard)
	@Delete('/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async deleteComment(@Token() user: User, @Param('idx') idx: number) {

	}
}
