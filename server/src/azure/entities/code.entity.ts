import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ schema: 'public', name: 'code' })
@Index('code_kind_id_idx', ['kind_id', 'code_id'])
export class CodeEntity {
	@PrimaryGeneratedColumn()
	public identity: number;

	@Column({ type: 'varchar', nullable: false, comment: '' })
	public kind_id: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public kind_name: string;

	@Column({ type: 'varchar', nullable: false, comment: '' })
	public code_id: string;

	@Column({ type: 'varchar', nullable: false, comment: '' })
	public code_name: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public code_desc: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public code_order: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_1: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_2: string;

	@Column({ type: 'timestamp', nullable: false, comment: '' })
	public create_date: Date;

	@Column({ type: 'varchar', nullable: false, comment: '' })
	public create_user: string;

	@Column({ type: 'timestamp', nullable: false, comment: '' })
	public update_date: Date;

	@Column({ type: 'varchar', nullable: false, comment: '' })
	public update_user: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_3: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_4: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_5: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_6: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_7: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_8: string;

	@Column({ type: 'varchar', nullable: true, comment: '' })
	public extend_9: string;
}
