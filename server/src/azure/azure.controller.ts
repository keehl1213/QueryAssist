import {
	Controller,
	Get,
	Param,
	Req,
	Logger,
	Redirect,
	Query,
	Res,
	BadRequestException,
	UseInterceptors,
	Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AzureService } from './azure.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TimeInterceptor } from '../utils/timer.interceptor';
import { AzureCallBackDto, LogoutQueryDto } from './dto/azure.dto';

@Controller('azure')
@UseInterceptors(TimeInterceptor)
export class AzureController {
	private readonly logger = new Logger(AzureController.name);
	constructor(private readonly AzureService: AzureService) {}

	@Get('callOBOGraphAPI/:token')
	async getAzureCallOBOGraphAPI(@Param('token') token: string) {
		try {
			const aadUserData =
				await this.AzureService.azureCallOBOGraph(token);
			const { id, displayName, mail, mailNickname } = aadUserData;
			const evAccount = await this.AzureService.evAccount(mailNickname);
			const userInfo = await this.AzureService.getUsurInfo(
				evAccount,
				mail,
				displayName
			);
			this.logger.log('userInfo', userInfo);
			return userInfo;
		} catch (error) {
			if (error) {
				throw error;
			}
			throw new BadRequestException(error);
		}
	}

	@Get('callback')
	@Redirect('', 302)
	async azureCallbackLogin(
		@Req() req: Request,
		@Query() azureCallBack: AzureCallBackDto
	) {
		const res = req.res;
		try {
			const { id, email, name } = azureCallBack;
			const azureToken = req.headers.authorization.split(' ')[1]; // 字串切割
			const userInfo = await this.AzureService.getUserInfo(
				id,
				email,
				name,
				azureToken
			);
			res.cookie('userInfo', userInfo);
			res.cookie('Authorization', azureToken, {
				httpOnly: true, // 防範 XSS 攻擊，讓 JS 無法讀取此 Cookie
				secure: true, // 確保僅在 HTTPS 上傳輸
				sameSite: 'strict', // 防止跨站請求攜帶
				maxAge: 60 * 120 * 2000, // 設置有效期為 2 小時
			});
			return {
				url: `${process.env.FRONTEND_URL}${process.env.REDIRECT_URL}`,
			};
		} catch (error) {
			/* User登入AAD成功，但是系統裡沒User資訊 */
			this.logger.error(`'error = ${error}`);
			return;
		}
	}

	@Get('logout')
	@ApiBearerAuth('jwt_token')
	async logout(
		@Req() req: Request,
		@Res() res: Response,
		@Query() logoutQuery: LogoutQueryDto
	) {
		const authorization = req.headers.authorization;
		if (authorization) {
			try {
				await this.AzureService.logout(req, res, logoutQuery.id);
			} catch (error) {
				this.logger.error(error);
				res.status(401).send(`Logout failed: \n ${error}`);
				return;
			}
		} else {
			res.status(401).send('No token');
			// throw new UserError('INVALID USER');
		}
	}
}
