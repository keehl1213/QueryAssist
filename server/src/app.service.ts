import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getQueryAssist(): string {
		// if (Math.random() > 0.5) {
		//   throw new BadRequestException('get helllo error');
		// }
		return 'Hello QueryAssist!';
	}
}
