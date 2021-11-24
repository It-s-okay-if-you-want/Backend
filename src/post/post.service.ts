import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import Post from 'src/entities/Post';
import User from 'src/entities/User';
import { CheckCategory } from 'src/lib/CheckCategory';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create.dto';
import UpdatePostDto from './dto/update.dto';

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
			}
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
			.where('user.local = :local', { local: userData.local })
			.orderBy('post.created_at', 'DESC')
			.getMany();

		return posts;
	}

	public async getHotPost(user: User): Promise<Post[]> {
		const userData: User = await this.userService.getUserById(user.id);

		return this.postRepo.createQueryBuilder('post')
			.leftJoin('post.user', 'user')
			.where('user.local = :local', { local: userData.local })
			.orderBy('post_like', 'DESC')
			.getRawMany();
	}

	public async deletePost(idx: number, user: User): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const post: Post | undefined = await this.postRepo.findOne({
			idx: idx
		});

		if (post === undefined) {
			throw new NotFoundException('존재하지 않는 게시글');
		}

		if (post.userId !== userData.id) {
			throw new UnauthorizedException('권한이 없습니다');
		}

		await this.postRepo.remove(post);
	}

	public async updatePost(idx: number, user: User, updateDto: UpdatePostDto): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const post: Post | undefined = await this.postRepo.findOne({
			idx: idx
		});

		if (post === undefined) {
			throw new NotFoundException('존재하지 않는 게시글');
		}

		if (post.userId !== userData.id) {
			throw new UnauthorizedException('권한이 없습니다');
		}

		this.postRepo.merge(post, {
			title: updateDto.title,
			content: updateDto.content,
			image: updateDto.image,
			category: CheckCategory(updateDto.category)
		});
		await this.postRepo.save(post);
	}

	public async getPostByCategory(user: User, category: number): Promise<Post[]> {
		const userData: User = await this.userService.getUserById(user.id);

		const checkCategory: string = CheckCategory(Number(category))

		const posts: Post[] = await this.postRepo.createQueryBuilder('post')
			.leftJoin('post.user', 'user')
			.where('user.local = :local', { local: userData.local })
			.andWhere('post.category = :checkCategory', { checkCategory })
			.getMany();

		return posts;
	}
}
