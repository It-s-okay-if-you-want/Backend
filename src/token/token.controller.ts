import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
	constructor(
		tokenService: TokenService,
	) { }
}
