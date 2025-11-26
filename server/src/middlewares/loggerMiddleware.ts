import {
	Injectable,
	NestMiddleware,
	Logger,
	InternalServerErrorException,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: any, res: any, next: NextFunction) {
		try {
			Logger.log(`'url = ${req.baseUrl}`);
			next();
		} catch (error) {
			throw new InternalServerErrorException(error?.message);
		}
	}
}
