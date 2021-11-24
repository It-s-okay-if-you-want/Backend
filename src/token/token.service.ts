import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtSignOptions } from '@nestjs/jwt';
import { sign, JwtPayload, verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config/config';
import RefreshDto from './dto/refresh.dto';


@Injectable()
export class TokenService {

	public generateToken(id: string): string {
		const payload = {
			id,
		};

		const option: JwtSignOptions = {
			subject: 'token',
			expiresIn: '24 hour',
		};

		return sign(payload, JWT_SECRET, option);
	}

	public generateRefreshToken(id: string): string {
		const payload = {
			id
		};

		const option: JwtSignOptions = {
			subject: 'refresh',
			expiresIn: '24 hour',
		};

		return sign(payload, JWT_SECRET, option);
	}

	public async verifyToken(token: string) {
		return verify(token, JWT_SECRET);
	}

	public async refreshToken(refreshDto: RefreshDto): Promise<string> {
		const { id, sub }: JwtPayload = this.verifyToken(refreshDto.refreshToken);

		if (sub !== 'refresh') {
			throw new UnauthorizedException('위조된 토큰');
		}

		return this.generateToken(id);
	}
}
