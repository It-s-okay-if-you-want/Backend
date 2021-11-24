import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity('comment')
export default class Comment {

	@PrimaryGeneratedColumn()
	idx!: string;

	@Column()
	content!: string;

	@CreateDateColumn({
		name: 'created_at'
	})
	createdAt: Date;

	@RelationId((commnet: Comment) => commnet.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@RelationId((comment: Comment) => comment.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}