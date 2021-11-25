import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User";
import Comment from "./Comment";

@Entity('comment_report')
export default class CommentReport {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	idx!: number;

	@ApiProperty()
	@RelationId((commentReport: CommentReport) => commentReport.comment)
	commentIdx!: number;

	@JoinColumn({ name: 'fk_comment_idx' })
	@ManyToOne(() => Comment, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	comment!: Comment;

	@ApiProperty()
	@RelationId((commentReport: CommentReport) => commentReport.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}