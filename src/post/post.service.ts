import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import Ban from 'src/entities/Ban';
import Post from 'src/entities/Post';
import PostLike from 'src/entities/PostLike';
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
		@InjectRepository(PostLike)
		private likeRepo: Repository<PostLike>,
		@InjectRepository(Ban)
		private banRepo: Repository<Ban>,
	) { }

	public async createPost(postDto: CreatePostDto, user: User) {
		const userData: User = await this.userService.getUserById(user.id);

		const isBan: Ban[] = await this.banRepo.createQueryBuilder()
			.where('end_date >= :date', { date: new Date() })
			.getMany();

		if (isBan.length > 0) {
			const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;

			if (regex.test(postDto.content)) {
				throw new BadRequestException('이모티콘만 사용할 수 있습니다');
			}
		}

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
			relations: ['postLikes', 'comment']
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
			.leftJoinAndSelect('post.comment', 'comment')
			.leftJoinAndSelect('post.postLikes', 'likes')
			.where('user.local = :local', { local: userData.local })
			.orderBy('post.created_at', 'DESC')
			.getMany();

		return posts;
	}

	public async getHotPost(user: User): Promise<Post[]> {
		const userData: User = await this.userService.getUserById(user.id);

		return this.postRepo.createQueryBuilder('post')
			.leftJoin('post.user', 'user')
			.leftJoinAndSelect('post.comment', 'comment')
			.leftJoinAndSelect('post.postLikes', 'likes')
			.where('user.local = :local', { local: userData.local })
			.orderBy('post_like', 'DESC')
			.getMany();
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

	public async addLike(user: User, idx: number): Promise<void> {
		const userData: User = await this.userService.getUserById(user.id);

		const post: Post | undefined = await this.postRepo.findOne({
			idx: idx
		});

		if (post === undefined) {
			throw new NotFoundException('존재하지 않는 게시글');
		}

		const like: PostLike | undefined = await this.likeRepo.findOne({
			post: post,
			user: userData
		});

		if (like !== undefined) {
			throw new UnauthorizedException('이미 좋아요를 눌렀습니다');
		}

		const newLike: PostLike = this.likeRepo.create();
		newLike.post = post;
		newLike.user = userData;
		await this.likeRepo.save(newLike);

		post.postLike += 1;
		await this.postRepo.save(post);
	}
}
