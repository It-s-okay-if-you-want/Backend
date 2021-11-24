import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import User from 'src/entities/User';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
	) { }
	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		const token = request.headers['authorization'];

		if (token === undefined) {
			throw new NotFoundException('토큰이 존재하지 않습니다');
		}

		request.user = this.validateToken(token);
		return true;
	}

	public async validateToken(token: string): Promise<User> {
		try {
			const verify: User = await this.tokenService.verifyToken(token) as User;
			return verify;
		} catch (error) {
			switch (error.message) {
				case 'jwt must be provided':
					throw new BadRequestException('토큰이 전송되지 않았습니다');
				case 'invalid signature':
				case 'invalid token':
				case 'jwt malformed':
					throw new UnauthorizedException('유효하지 않은 토큰');

				case 'jwt expired':
					throw new UnauthorizedException('만료된 토큰');

				default:
					throw new InternalServerErrorException('서버 오류');
			}
		}
	}
}
