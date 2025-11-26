import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { FunctionList } from './functionList.entity';

@Entity({ schema: 'public' })
export class RoleFunction {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ nullable: true, comment: 'role_id' })
	public role_id: number;

	@Column({ nullable: true, comment: 'functionlist_id' })
	public functionlist_id: number;

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

	@ManyToOne((type) => Role, (item) => item.roleFunction)
	public role: Role;

	@ManyToOne((type) => FunctionList, (item) => item.role_function)
	public functionlist: FunctionList;
}
