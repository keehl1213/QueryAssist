import * as jwt from 'jsonwebtoken';
import {
	NestMiddleware,
	UnauthorizedException,
	Injectable,
	Logger,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AccountService } from '../account/account.service';
import { ConfidentialClientApplication } from '@azure/msal-node';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationMSALMiddleware implements NestMiddleware {
	private readonly logger = new Logger(AuthorizationMSALMiddleware.name);
	constructor(
		private readonly AccountService: AccountService,
		private readonly configService: ConfigService
	) {}
	async use(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			try {
				const bearerToken = req.headers.authorization
					.replace('Bearer', '')
					?.trim();
				const oboRequest = {
					oboAssertion: bearerToken,
					scopes: ['User.Read'],
				};
				const confidentialClientApplicationOBO =
					new ConfidentialClientApplication({
						auth: this.configService.get(
							'azureClientCredential.auth'
						),
					});
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
				const { mailNickname } = aadUserData;
				this.logger.debug(mailNickname);
				const account =
					await this.AccountService.getAccountByEmployeeId({
						employee_id: mailNickname,
					});
				if (
					mailNickname
						.toUpperCase()
						.includes(account.employee_id.toUpperCase())
				) {
					next();
				} else {
					// 不同使用者沒有權限
					res.status(401).send('Unauthorized: not same user');
					return;
				}
			} catch (err) {
				this.logger.error(err.message);
				throw new UnauthorizedException(err?.message);
			}
		} else {
			throw new UnauthorizedException();
		}
	}
}
