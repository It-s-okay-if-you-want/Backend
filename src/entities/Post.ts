import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User";
import Comment from "./Comment";
import Category from "./Category";

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

	@RelationId((post: Post) => post.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user!: User;

	@RelationId((post: Post) => post.category)
	categoryIdx!: number;

	@JoinColumn({ name: 'fk_category_idx' })
	@ManyToOne(() => Category, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	category!: Category;

	@ApiProperty()
	@OneToMany(() => Comment, (comment) => comment.post)
	comment!: Comment[];
}