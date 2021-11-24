import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		authService: AuthService,
	) { }

	@Post('/register')
	@HttpCode(200)
	async Register(@Body() registerDto: RegisterDto) {

	}
}
