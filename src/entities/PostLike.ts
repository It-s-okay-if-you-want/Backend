import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Group from "./Group";
import Post from "./Post";
import User from "./User";

@Entity('post_like')
export default class PostLike {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	idx!: number;

	@ApiProperty()
	@RelationId((postLike: PostLike) => postLike.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@ApiProperty()
	@RelationId((postLike: PostLike) => postLike.group)
	groupIdx!: number;

	@JoinColumn({ name: 'fk_group_idx' })
	@ManyToOne(() => Group, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	group: Group;

	@ApiProperty()
	@RelationId((postLike: PostLike) => postLike.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}