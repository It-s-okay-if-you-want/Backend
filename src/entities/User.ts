import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Comment from "./Comment";
import Post from "./Post";
import PostLike from "./PostLike";
import Report from "./Report";

@Entity('user')
export default class User {

	@PrimaryColumn()
	id: string;

	@Column()
	pw: string;

	@Column()
	nick: string;

	@Column()
	local: string;

	@OneToMany(() => Post, (post) => post.user)
	post!: Post[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comment!: Comment[];

	@OneToMany(() => PostLike, (postLike) => postLike.user)
	postLike!: PostLike[];

	@OneToMany(() => Report, (report) => report.user)
	report: Report[];
}