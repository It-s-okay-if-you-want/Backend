import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreatePostDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	title!: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content!: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	image?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	category: number;
}