import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class AddCommentDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content!: string;
}