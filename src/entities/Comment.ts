import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Group from "./Group";
import Post from "./Post";
import User from "./User";

@Entity('comment')
export default class Comment {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	idx!: string;

	@ApiProperty()
	@Column()
	content!: string;

	@ApiProperty()
	@CreateDateColumn({
		name: 'created_at'
	})
	createdAt: Date;

	@ApiProperty()
	@RelationId((commnet: Comment) => commnet.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@ApiProperty()
	@RelationId((commnet: Comment) => commnet.group)
	groupIdx!: number;

	@JoinColumn({ name: 'fk_group_idx' })
	@ManyToOne(() => Group, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	group!: Group;

	@ApiProperty()
	@RelationId((comment: Comment) => comment.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}