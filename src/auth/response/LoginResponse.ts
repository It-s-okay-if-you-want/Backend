import { ApiProperty } from "@nestjs/swagger";
import User from "src/entities/User";
import BaseResponse from "src/lib/BaseResponse";

export class Login {
	@ApiProperty()
	user: User;

	@ApiProperty()
	token: string;

	@ApiProperty()
	refreshToken: string;
}

export default class LoginResponse extends BaseResponse<Login> {

	@ApiProperty()
	data: Login;
}

export class MyResponse extends BaseResponse<User>{

	@ApiProperty()
	data: User;
}