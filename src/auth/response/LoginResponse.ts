import { ApiProperty } from "@nestjs/swagger";
import User from "src/entities/User";
import BaseResponse from "src/lib/BaseResponse";
// import { Login } from "src/types/types";

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