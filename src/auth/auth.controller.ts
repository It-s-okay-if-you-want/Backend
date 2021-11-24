import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/lib/BaseResponse';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

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
}
