import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('queryassist')
	getQueryAssist(): string {
		// 如果不想用 Nest 的預設格式，同樣可以把參數換成 Object 來覆蓋：
		// throw new BadRequestException({ message: 'get helllo error', status: 400 });
		return this.appService.getQueryAssist();
	}
}
