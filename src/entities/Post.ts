import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User";
import Comment from "./Comment";

@Entity('post')
export default class Post {

	@PrimaryGeneratedColumn()
	idx!: number;

	@Column()
	title!: string;

	@Column()
	content!: string;

	@Column({
		nullable: true,
	})
	image?: string;

	@Column()
	category!: string;

	@RelationId((post: Post) => post.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user!: User;

	@ApiProperty()
	@OneToMany(() => Comment, (comment) => comment.post)
	comment!: Comment[];
}