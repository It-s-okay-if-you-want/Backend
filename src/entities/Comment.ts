import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import CommentReport from "./CommentReport";
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
	@RelationId((comment: Comment) => comment.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;

	@ApiProperty({ type: () => [CommentReport] })
	@OneToMany(() => CommentReport, (commentReport) => commentReport.comment)
	commentReport: CommentReport[];
}