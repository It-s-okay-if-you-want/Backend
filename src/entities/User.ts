import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Comment from "./Comment";
import Post from "./Post";
import Report from "./Report";

@Entity('user')
export default class User {

	@ApiProperty()
	@PrimaryColumn()
	id: string;

	@ApiProperty()
	@Column()
	pw: string;

	@ApiProperty()
	@Column()
	nick: string;

	@ApiProperty()
	@Column()
	local: string;

	@OneToMany(() => Post, (post) => post.user)
	post!: Post[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comment!: Comment[];

	@OneToMany(() => Report, (report) => report.user)
	report: Report[];
}