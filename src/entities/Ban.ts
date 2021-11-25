import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User";

@Entity('ban')
export default class Ban {

	@PrimaryGeneratedColumn()
	idx!: number;

	@Column()
	startDate!: Date;

	@Column()
	endDate!: Date;

	@ApiProperty()
	@RelationId((ban: Ban) => ban.user)
	userId!: string;

	@JoinColumn({ name: 'fk_user_id' })
	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	user!: User;
}