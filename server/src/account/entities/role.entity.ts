import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleFunction } from './roleFunction.entity';
import { AccountEntity } from './account.entity';

@Entity({ schema: 'public' })
export class Role {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ nullable: false, comment: 'role_name', default: '' })
	public name: string;

	@Column({ nullable: true, comment: '寫入者' })
	public creator: string;

	@Column({
		type: 'timestamp',
		nullable: false,
		comment: '寫入時間',
		default: () => 'CURRENT_TIMESTAMP',
	})
	public created_time: Date;

	@Column({ nullable: true, comment: '新增者' })
	public modifier: string;

	@Column({ type: 'timestamp', nullable: true, comment: '更新時間' })
	public modified_time: Date;

	@OneToMany((type) => RoleFunction, (roleFunction) => roleFunction.role)
	public roleFunction: RoleFunction[];

	@OneToMany(() => AccountEntity, account => account.role)
	account: AccountEntity[];
}
