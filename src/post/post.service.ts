import { Injectable, NotFoundException } from '@nestjs/common';
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

	public async getPost(idx: number): Promise<Post> {
		const post: Post | undefined = await this.postRepo.findOne({
			where: {
				idx: idx
			},
			relations: ['postLike']
		});

		if (post === undefined) {
			throw new NotFoundException('존재하지 않는 게시물');
		}

		return post;
	}

	public async getNewPost(user: User): Promise<Post[]> {
		const userData: User = await this.userService.getUserById(user.id);

		const posts: Post[] = await this.postRepo.createQueryBuilder('post')
			.leftJoin('post.user', 'user')
			.leftJoinAndSelect('post.postLike', 'like')
			.where('user.local = :local', { local: userData.local })
			.orderBy('post.created_at', 'DESC')
			.getMany();

		return posts;
	}

	public async getHotPost(): Promise<Post[]> {
		return this.postRepo.createQueryBuilder('post')
			.leftJoinAndSelect('post.postLike', 'postlike')
			.orderBy('COUNT(postlike)', 'DESC')
			.getMany();
	}
}
