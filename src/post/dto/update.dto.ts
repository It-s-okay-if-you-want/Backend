import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdatePostDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	title?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	content?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	image?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	category?: number;
}