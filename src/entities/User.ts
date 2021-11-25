import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Comment from "./Comment";
import Group from "./Group";
import Post from "./Post";
import PostLike from "./PostLike";
import PostReport from "./PostReport";

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

	@ApiProperty({ type: () => [Post] })
	@OneToMany(() => Post, (post) => post.user)
	post!: Post[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comment!: Comment[];

	@OneToMany(() => PostReport, (postReport) => postReport.user)
	postReport: PostReport[];

	@ApiProperty({ type: () => [PostLike] })
	@OneToMany(() => PostLike, (postLike) => postLike.user)
	postLikes!: PostLike[];

	@ApiProperty({ type: () => [Group] })
	@OneToMany(() => Group, (group) => group.user)
	group!: Group[];
}