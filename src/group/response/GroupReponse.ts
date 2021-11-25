import { ApiProperty } from "@nestjs/swagger";
import Group from "src/entities/Group";
import BaseResponse from "src/lib/BaseResponse";

export class GetGroupsReponse extends BaseResponse<Group[]> {
  @ApiProperty({ type: () => [Group] })
  data: Group[];
}

export class GetGroupReponse extends BaseResponse<Group> {
  @ApiProperty()
  data: Group;
}

