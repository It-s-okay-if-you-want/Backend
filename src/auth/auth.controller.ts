import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/lib/BaseResponse';
import { Login } from 'src/types/types';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import LoginResponse from './response/LoginResponse';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
	) { }

	@Post('/register')
	@HttpCode(200)
	@ApiOkResponse({ type: BaseResponse })
	async Register(@Body() registerDto: RegisterDto) {
		await this.authService.register(registerDto);

		return new BaseResponse(200, "회원가입 성공");
	}

	@Post('/login')
	@HttpCode(200)
	@ApiOkResponse({ type: LoginResponse })
	async Login(@Body() loginDto: LoginDto) {
		const data: Login = await this.authService.login(loginDto);

		return new LoginResponse(200, "로그인 성공", data);
	}
}
