import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity('report')
export default class Report {

	@PrimaryGeneratedColumn()
	idx!: number;

	@ApiProperty()
	@RelationId((report: Report) => report.post)
	postIdx!: number;

	@JoinColumn({ name: 'fk_post_idx' })
	@ManyToOne(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	post!: Post;

	@ApiProperty()
	@RelationId((report: Report) => report.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	user!: User;
}