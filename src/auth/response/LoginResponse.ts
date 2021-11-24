import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/lib/BaseResponse";
import { Login } from "src/types/types";

export default class LoginResponse extends BaseResponse<Login> {
	@ApiProperty()
	data: Login;
}