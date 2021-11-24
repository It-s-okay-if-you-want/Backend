import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity('post_like')
export default class PostLike {

	@PrimaryGeneratedColumn()
	idx!: number;

	@RelationId((postLike: PostLike) => postLike.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => PostLike, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@RelationId((postLike: PostLike) => postLike.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => PostLike, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}