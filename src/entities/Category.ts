import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Post from "./Post";

@Entity('category')
export default class Category {

	@PrimaryGeneratedColumn()
	idx!: number;

	@Column()
	name!: string;

	@OneToMany(() => Post, (post) => post.category)
	post!: Post[];
}