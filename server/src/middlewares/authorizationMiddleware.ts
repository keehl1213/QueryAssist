import * as jwt from 'jsonwebtoken';
import {
	NestMiddleware,
	UnauthorizedException,
	Injectable,
	Logger,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AccountService } from '../account/account.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
	private readonly logger = new Logger(AuthorizationMiddleware.name);
	constructor(private readonly redisService: RedisService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.headers.authorization !== undefined && !req.headers.isIam) {
				const bearToken = req.headers['authorization'] as string;
				Logger.log(`'bearToken = ${bearToken}`);
				const accessToken = bearToken?.split(' ')[0];
				const jwtPayload = jwt.verify(
					accessToken,
					process.env.JWT_SECRET
				);
				if (!jwtPayload) {
					res.status(401).send('JWT error');
					return;
				}
				const id = (jwtPayload as any).id;
				const data = await this.redisService.get(id);
				if (!data) {
					res.status(401).send('token expired');
					return;
				}
				req['user'] = jwtPayload;
				next();
			} else {
				res.status(401).send('No token');
			}
		} catch (err) {
			throw new UnauthorizedException(err?.message);
		}
	}
}
