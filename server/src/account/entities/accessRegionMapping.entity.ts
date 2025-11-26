import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	JoinColumn,
} from 'typeorm';
import { AccessRegionList } from './accessRegionList.entity';
import { AccountEntity } from './account.entity';

@Entity({ schema: 'cancel_report', name: 'access_region_mapping' })
export class AccessRegionMapping {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ nullable: false, comment: 'AccessRegionId', default: '' })
	public access_region_list_id: string;

	@Column({ nullable: false, comment: 'AccountId', default: '' })
	public account_id: string;

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

	@Column({
		type: 'timestamp',
		nullable: false,
		comment: '更新時間',
		default: () => 'CURRENT_TIMESTAMP',
	})
	public modified_time: Date;

	@ManyToOne(
		(type) => AccessRegionList,
		(region) => region.access_region_mapping
	)
	public access_region_list: AccessRegionList;

	@ManyToOne(
		(type) => AccountEntity,
		(account) => account.access_region_mapping
	)
	public account: AccountEntity;
}
