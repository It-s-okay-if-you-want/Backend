import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export default class VoteDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	agree!: boolean;
}