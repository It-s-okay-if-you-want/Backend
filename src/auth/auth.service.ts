import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { Repository } from 'typeorm';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private authRepo: Repository<User>,
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
}
