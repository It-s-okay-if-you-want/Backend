import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export default class RegisterDto {

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	id!: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	pw: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	nick!: string;

	@ApiProperty({ required: true })
	@Column()
	@IsString()
	local: string;
}