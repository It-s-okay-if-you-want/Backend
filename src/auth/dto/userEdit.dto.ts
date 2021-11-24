import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export default class UserEditDto {
	@ApiProperty({ required: true })
	@IsOptional()
	@IsString()
	nick?: string;

	@ApiProperty({ required: true })
	@IsOptional()
	@IsString()
	local?: string;
}