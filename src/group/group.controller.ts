import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import Group from 'src/entities/Group';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import CreateGroupDto from './dto/createGroupDto';
import UpdateGroupDto from './dto/updateGroupDto';
import { GroupService } from './group.service';
import { GetGroupReponse, GetGroupsReponse } from './response/GroupReponse';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
  ) { }

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetGroupsReponse })
  @ApiBasicAuth()
  async getGroups(@Token() user: User) {
    const groups: Group[] = await this.groupService.getGroups(user);

    return new GetGroupsReponse(200, '같이해요 전체 최신순 조회 성공', groups);
  }

  @Get('/:idx')
  @HttpCode(200)
  @ApiOkResponse({ type: GetGroupReponse })
  @ApiBasicAuth()
  async getGroup(@Param('idx') idx: number) {
    const group: Group = await this.groupService.getGroup(idx);

    return new GetGroupReponse(200, '같이해요 조회 성공', group);
  }


  @Post('/')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBasicAuth()
  async createGroup(@Token() user: User, @Body() createGroupDto: CreateGroupDto) {
    await this.groupService.createGroup(user, createGroupDto);

    return new BaseResponse(200, '같이해요 작성 성공');
  }

  @Put('/:idx')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBasicAuth()
  async updateGroup(@Param('idx') idx: number, @Token() user: User, @Body() updateGroupDto: UpdateGroupDto) {
    await this.groupService.updateGroup(idx, user, updateGroupDto);

    return new BaseResponse(200, '같이해요 수정 성공');
  }

  @Delete('/:idx')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBasicAuth()
  async deleteGroup(@Param('idx') idx: number, @Token() user: User) {
    await this.groupService.deleteGroup(idx, user);

    return new BaseResponse(200, '같이해요 삭제 성공');
  }

  @Post('/like/:idx')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: BaseResponse })
  @ApiBasicAuth()
  async addLike(@Token() user: User, @Param('idx') idx: number) {
    await this.groupService.addLike(idx, user);

    return new BaseResponse(200, '좋아요 성공');
  }
}
