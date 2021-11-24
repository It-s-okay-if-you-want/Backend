import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class LoginDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	id!: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	pw!: string;
}