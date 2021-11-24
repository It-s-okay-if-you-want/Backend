import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { TokenService } from 'src/token/token.service';
import { Login } from 'src/types/types';
import { Repository } from 'typeorm';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private authRepo: Repository<User>,
		private tokenService: TokenService,
	) { }

	async register(registerDto: RegisterDto): Promise<void> {
		const isExistUser = await this.authRepo.findOne({
			id: registerDto.id
		});

		if (isExistUser !== undefined) {
			throw new ForbiddenException('이미 존재하는 유저');
		}

		await this.authRepo.save(registerDto);
	}

	async login(loginDto: LoginDto): Promise<Login> {
		const user = await this.authRepo.findOne({
			id: loginDto.id,
			pw: loginDto.pw
		});

		if (user === undefined) {
			throw new UnauthorizedException('아이디 혹은 비밀번호가 틀렸습니다');
		}

		const token = this.tokenService.generateToken(user.id);
		const refreshToken = this.tokenService.generateRefreshToken(user.id);

		return {
			user,
			token,
			refreshToken
		}
	}
}
