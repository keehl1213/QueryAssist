import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ schema: 'sdb__billing__public', name: 'ww_hcm_wa_employeeinfo_g' })
export class WwHcmWaEmployeeinfoGEntity {
	@PrimaryGeneratedColumn()
	public pkid: number;

	@Column({ type: 'varchar', nullable: false, comment: '' })
	public emailid: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public deptid: string;
}
