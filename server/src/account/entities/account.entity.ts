import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn
} from 'typeorm';
import { Role } from './role.entity';
import { AccessRegionMapping } from './accessRegionMapping.entity';
@Entity({ schema: 'public', name: 'account' })
export class AccountEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false, comment: '電子郵件' })
	email: string;

	@Column({ type: 'varchar', nullable: true, comment: '職工編號' })
	employee_id: string;

	@Column({ type: 'varchar', nullable: true, comment: '區域' })
	region: string;

	@Column({ type: 'varchar', nullable: true, comment: '密碼' })
	password: string;

	@Column({ type: 'varchar', nullable: false, comment: '姓名' })
	name: string;

	@Column({ type: 'int', nullable: false, comment: '角色編號' })
	role_id: number;

	@Column({ type: 'varchar', nullable: false, comment: '建立人員' })
	creator: string;

	@Column({
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
		comment: '建立時間',
	})
	created_time: Date;

	@Column({ type: 'varchar', nullable: false, comment: '最後異動人員' })
	modifier: string;

	@Column({
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
		comment: '最後異動時間',
	})
	modified_time: Date;

	@Column({ type: 'varchar', nullable: true, comment: '主題樣式' })
	theme: string;

	@Column({ nullable: true, comment: '目前主要頁面' })
	business_type: string;

	@Column({ type: 'timestamp', nullable: true, comment: '上次登入時間' })
	login_time: Date;

	@ManyToOne(() => Role, role => role.account)
	@JoinColumn({ name: 'role_id' })
	role: Role;

	@OneToMany((type) => AccessRegionMapping, (mapping) => mapping.account)
	access_region_mapping: AccessRegionMapping[];
}
