import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/decorator/token.decorator';
import User from 'src/entities/User';
import { AuthGuard } from 'src/guard/AuthGuard';
import BaseResponse from 'src/lib/BaseResponse';
import { Login } from 'src/types/types';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import UserEditDto from './dto/userEdit.dto';
import LoginResponse, { MyResponse } from './response/LoginResponse';

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

	@UseGuards(AuthGuard)
	@Post('/edit')
	@ApiOkResponse({ type: BaseResponse })
	@ApiBasicAuth('authorization')
	async Edit(@Body() userEditDto: UserEditDto, @Token() user: User) {
		await this.authService.userEdit(userEditDto, user);

		return new BaseResponse(200, "유저 정보 수정 성공");
	}

	@UseGuards(AuthGuard)
	@Get('/')
	@HttpCode(200)
	@ApiOkResponse({ type: MyResponse })
	@ApiBasicAuth()
	async My(@Token() user: User) {
		const data: User = await this.authService.getUserById(user.id);

		return new MyResponse(200, "프로필 조회 성공", data);
	}
}
