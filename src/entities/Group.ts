import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Comment from "./Comment";
import PostLike from "./PostLike";
import User from "./User";

@Entity('group')
export default class Group {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx!: number;

  @ApiProperty()
  @Column({ name: 'title' })
  title!: string;

  @ApiProperty()
  @Column({ name: 'content' })
  content!: string;

  @ApiProperty()
  @Column({
    name: 'category',
    default: '같이해요'
  })
  category!: string;

  @ApiProperty()
  @Column({ name: 'date' })
  date!: Date;

  @ApiProperty()
  @Column({ name: 'place' })
  place!: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  image?: string;

  @ApiProperty()
  @Column({
    default: 0,
    name: 'post_like'
  })
  postLike!: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @RelationId((group: Group) => group.user)
  userId!: string;

  @JoinColumn({ name: 'fk_user_id' })
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @ApiProperty({ type: () => [Comment] })
  @OneToMany(() => Comment, (comment) => comment.group)
  comment!: Comment[];

  @ApiProperty({ type: () => [PostLike] })
  @OneToMany(() => PostLike, (postLike) => postLike.group)
  postLikes!: PostLike[];
}