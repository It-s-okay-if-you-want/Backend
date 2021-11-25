import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity('post_vote')
export default class PostVote {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	idx!: number;

	@ApiProperty()
	@RelationId((postVote: PostVote) => postVote.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@ApiProperty()
	@RelationId((postVote: PostVote) => postVote.post)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;

	@ApiProperty()
	@Column()
	agree!: boolean;
}