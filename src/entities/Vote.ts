import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity('vote')
export default class Vote {

	@PrimaryGeneratedColumn()
	idx!: number;

	@RelationId((vote: Vote) => vote.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@RelationId((vote: Vote) => vote.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}