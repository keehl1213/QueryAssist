import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { GetAccountByEmployeeIdDto } from './dto/get-account.dto';
import * as moment from 'moment';

@Injectable()
export class AccountService {
	private readonly logger = new Logger(AccountService.name);

	constructor(
		// 將 DB 注入到 service 中
		@InjectRepository(AccountEntity, process.env.DB_NAME)
		private accountRepository: Repository<AccountEntity>
	) {}

	public async getAccountByEmployeeId(
		getAccountByEmployeeIdDto: GetAccountByEmployeeIdDto
	): Promise<AccountEntity | null> {
		return await this.accountRepository.findOne({
			where: getAccountByEmployeeIdDto,
		});
	}

	public async updateAccountLoginTime(
		getAccountByEmployeeIdDto: GetAccountByEmployeeIdDto
	): Promise<AccountEntity | null> {
		const result = await this.accountRepository.update(
			getAccountByEmployeeIdDto,
			{
				login_time: new Date(
					moment().utc().format('YYYY/MM/DD HH:mm:ssZ')
				),
			}
		);
		this.logger.debug(result);
		return await this.accountRepository.findOne({
			where: getAccountByEmployeeIdDto,
		});
	}

	public async loginUpdateNameAndEmail(
		account: AccountEntity,
		name: string,
		email: string,
		employeeId: string
	): Promise<void> {
		// name與employeeId不同的表示有改過，不做修改
		if (account.name !== account.employee_id) {
			return null;
		}
		// account update 需要的資料
		account.name = name;
		account.email = email;
		account.modifier = employeeId;
		account.modified_time = new Date(
			moment().utc().format('YYYY/MM/DD HH:mm:ssZ')
		);
		await this.accountRepository.save(account);
	}
}
