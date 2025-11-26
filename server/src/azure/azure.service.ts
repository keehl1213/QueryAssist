import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { ConfidentialClientApplication } from '@azure/msal-node';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { RedisService } from '../redis/redis.service';
import { GetAccountByEmployeeIdDto } from '../account/dto/get-account.dto';
import { CodeEntity } from './entities/code.entity';
import { WwHcmWaEmployeeinfoGEntity } from './entities/wwHcmWaEmployeeinfoG.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AzureService {
	private readonly logger = new Logger(AzureService.name);

	constructor(
		// 將 DB 注入到 service 中
		@InjectRepository(CodeEntity, process.env.DB_NAME)
		private codeRepository: Repository<CodeEntity>,
		@InjectRepository(WwHcmWaEmployeeinfoGEntity, process.env.DB_NAME)
		private wwHcmWaEmployeeinfoGRepository: Repository<WwHcmWaEmployeeinfoGEntity>,
		private readonly AccountService: AccountService,
		private readonly configService: ConfigService<AllConfigType>,
		private readonly RedisService: RedisService
	) {}

	public async azureCallOBOGraph(token: string) {
		const oboRequest = {
			oboAssertion: token,
			scopes: ['User.Read'],
		};
		const confidentialClientApplicationOBO =
			new ConfidentialClientApplication(
				this.configService.get('azureClientCredential', { infer: true })
			);
		const oboResponse =
			await confidentialClientApplicationOBO.acquireTokenOnBehalfOf(
				oboRequest
			);
		const { accessToken } = oboResponse;
		const aadUserData = await axios
			.get(
				'https://graph.microsoft.com/v1.0/me?$select=mail,displayName,surname,userType,depId,department,id,mailNickname,officeLocation,businessPhones',
				{ headers: { Authorization: accessToken } }
			)
			.then((info) => info.data);
		return aadUserData;
	}

	public async evAccount(employee_id: string) {
		const account = await this.AccountService.getAccountByEmployeeId({
			employee_id: employee_id,
		});
		if (!account) {
			throw new BadRequestException('SYSTEM_ERROR - Permission denied');
		}
		return account;
	}

	public async getUsurInfo(account, mail, displayName) {
		return {
			id: account.id,
			email: mail,
			employeeId: account.employee_id,
			name: displayName,
			roleId: account.role_id,
			theme: account.theme,
			region: account.region,
			businessType: account.business_type,
			iat: Date.now(),
		};
	}

	public async getUserInfo(
		employeeId: string,
		email: string,
		name: string,
		azureToken: string
	) {
		const account = await this.evAccount(employeeId);
		const useAI = await this.codeRepository.findOneBy({
			kind_id: '46',
			code_id: '01',
		});
		await this.AccountService.updateAccountLoginTime({
			employee_id: employeeId,
		});
		await this.AccountService.loginUpdateNameAndEmail(
			account,
			name,
			email,
			employeeId
		);
		const empInfo = await this.wwHcmWaEmployeeinfoGRepository
			.createQueryBuilder()
			.where('LOWER(emailid) like LOWER(:emailid)', {
				emailid: `%${name}%`,
			})
			.getOne();

		const realToken = jwt.sign(
			{
				id: account.id,
				email: email,
				employeeId: employeeId,
				name: name,
				roleId: account.role_id,
				theme: account.theme,
				region: account.region,
				businessType: account.business_type,
				useAI: useAI.extend_1,
				deptId: empInfo?.deptid,
			},
			process.env.JWT_SECRET
		);

		// token寫入redis
		await this.RedisService.set(
			account.id.toString(),
			azureToken,
			parseInt(process.env.TOKEN_EXPIREDTIME, 10)
		);
		// client.set(account.id, realToken, 'EX', process.env.TOKEN_EXPIREDTIME);
		const redies_data = await this.RedisService.get(account.id.toString());
		this.logger.log(`'redies_data = ${redies_data}`);

		return realToken;
	}

	public async logout(req, res, id: string) {
		const bearerToken = req.headers.authorization.split(' ')[1]; // 字串切割
		this.logger.log(bearerToken);
		const data = await this.RedisService.get(id);

		// token是否逾期驗證，取不到資料就是被redis刪除了
		if (!data) {
			return res.status(401).send('token expired');
		}

		// 驗證使用者是否在其他地方登入，有重登redis的token會重set，會跟傳入的token不一致
		if (data !== bearerToken) {
			return res
				.status(401)
				.send('account login at at another device, please relogin');
		}

		await this.RedisService.del(id);
		// req.logOut((err) => {
		//     // if (err) { return next(err); }
		// });
		res.status(200).send();
	}

	// public async verifyAuthToken(token: string) {
	//     const bearerToken = req.headers.authorization.split(' ')[0]; // 字串切割
	//     const jwtPayload = jwt.verify(bearerToken, process.env.JWT_SECRET);
	//     this.logger.log(jwtPayload);

	//     if (!jwtPayload) {
	//     res.status(401).send('JWT error');
	//     return;
	//     }
	// }
}
