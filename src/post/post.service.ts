import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import Post from 'src/entities/Post';
import User from 'src/entities/User';
import { CheckCategory } from 'src/lib/CheckCategory';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create.dto';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post)
		private postRepo: Repository<Post>,
		private userService: AuthService,
	) { }

	public async createPost(postDto: CreatePostDto, user: User) {
		const userData: User = await this.userService.getUserById(user.id);

		const newPost: Post = this.postRepo.create({
			title: postDto.title,
			content: postDto.content,
			image: postDto.image
		});
		newPost.user = userData;
		newPost.category = CheckCategory(postDto.category);
		await this.postRepo.save(newPost);
	}
}
