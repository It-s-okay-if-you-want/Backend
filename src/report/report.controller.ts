import { Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import { ReportService } from './report.service';

@ApiTags('report')
@Controller('report')
export class ReportController {
	constructor(
		private reportService: ReportService,
	) { }

	@UseGuards(AuthGuard)
	@Post('/post/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async addPostReport(@Token() user: User, @Param('idx') idx: number) {
		await this.reportService.addPostReport(user, idx);

		return new BaseResponse(200, "섭섭해요");
	}

	@UseGuards(AuthGuard)
	@Delete('/post/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async deletePostReport(@Token() user: User, @Param('idx') idx: number) {
		await this.reportService.deletePostReport(user, idx);

		return new BaseResponse(200, '섭섭해요 취소');
	}

	@UseGuards(AuthGuard)
	@Post('/comment/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async addCommentReport(@Token() user: User, @Param('idx') idx: number) {
		await this.reportService.addCommentReport(user, idx);

		return new BaseResponse(200, "섭섭해요");
	}

	@UseGuards(AuthGuard)
	@Delete('/comment/:idx')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth()
	async deleteCommentReport(@Token() user: User, @Param('idx') idx: number) {
		await this.reportService.deleteCommentReport(user, idx);

		return new BaseResponse(200, '섭섭해요 취소');
	}
}
