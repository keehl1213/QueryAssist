import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccessRegionMapping } from './accessRegionMapping.entity';

@Entity({ schema: 'cancel_report', name: 'access_region_list' })
export class AccessRegionList {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ nullable: false, comment: 'RegionName', default: '' })
	public region: string;

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

	@OneToMany(
		(type) => AccessRegionMapping,
		(mapping) => mapping.access_region_list
	)
	public access_region_mapping: AccessRegionMapping[];
}
