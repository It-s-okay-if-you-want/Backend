import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export default class RegisterDto {

	@IsNotEmpty()
	@IsString()
	id!: string;

	@IsNotEmpty()
	@IsString()
	pw: string;

	@IsNotEmpty()
	@IsString()
	nick!: string;

	@Column()
	@IsString()
	local: string;
}