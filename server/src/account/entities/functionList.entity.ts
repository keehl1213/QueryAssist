import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleFunction } from './roleFunction.entity';

@Entity({ schema: 'public', name: 'function_list' })
export class FunctionList {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ nullable: true, comment: '上一層的key id, 主目錄為0' })
	public parent_id: number;

	@Column({ nullable: false, comment: 'role_name', default: '' })
	public name: string;

	@Column({ nullable: true, comment: '是否為底層 0為否, 1為是', default: 0 })
	public is_bottom: number;

	@Column({ nullable: true, comment: '寫入者' })
	public creator: string;

	@Column({
		nullable: false,
		type: 'timestamp',
		comment: '寫入時間',
		default: () => 'CURRENT_TIMESTAMP',
	})
	public created_time: Date;

	@Column({ nullable: true, comment: '新增者' })
	public modifier: string;

	@Column({ type: 'timestamp', nullable: true, comment: '更新時間' })
	public modified_time: Date;

	@Column({ nullable: true, comment: '區分不同business或customer' })
	public business_type: string;

	@Column({ nullable: true, comment: '順序' })
	public order: number;

	@Column({ nullable: true, comment: '前端路徑' })
	public route: string;

	@Column({ nullable: true, comment: 'antd的圖案' })
	public antd_icon: string;

	@Column({ nullable: true, comment: 'component的變數名稱' })
	public component_key: string;

	@Column({ nullable: true, comment: '頁面標題' })
	public page_title: string;

	@Column({ nullable: true, comment: '左側選單的連結路徑' })
	public menu_url: string;

	@OneToMany(
		(type) => RoleFunction,
		(role_function) => role_function.functionlist
	)
	public role_function: RoleFunction[];
}
