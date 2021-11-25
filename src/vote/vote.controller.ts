import { Body, Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import VoteDto from './dto/vote.dto';
import { VoteService } from './vote.service';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(
    private voteService: VoteService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('/:idx')
  @HttpCode(200)
  @ApiOkResponse({ type: BaseResponse })
  async addVote(@Body() voteDto: VoteDto, @Token() user: User, @Param('idx') idx: number) {
    await this.voteService.addPostVote(idx, user, voteDto.agree);

    return new BaseResponse(200, "투표 완료");
  }
}
