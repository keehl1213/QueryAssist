import { Controller, Query, Get, Req, Logger } from '@nestjs/common';
import { AccountService } from './account.service';
import { GetAccountByEmployeeIdDto } from './dto/get-account.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('account')
export class AccountController {
	private readonly logger = new Logger(AccountController.name);
	constructor(private readonly AccountService: AccountService) {}

	// @Get()
	// @ApiBearerAuth('jwt_token')
	// getAccount(@Query() query:GetAccountByEmployeeIdDto, @Req() req: Request,) {
	//     this.logger.log('req:',req);
	//     return this.AccountService.getAccountByEmployeeId(query);
	// }
}
