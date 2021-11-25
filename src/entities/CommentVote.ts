import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";
import Comment from "./Comment";

@Entity('comment_vote')
export default class CommentVote {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	idx!: number;

	@ApiProperty()
	@RelationId((commentVote: CommentVote) => commentVote.comment)
	commentIdx!: number;

	@JoinColumn({ name: 'fk_comment_idx' })
	@ManyToOne(() => Comment, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	comment!: Comment;

	@Column()
	agree!: boolean;

	@ApiProperty()
	@RelationId((commentVote: CommentVote) => commentVote.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}