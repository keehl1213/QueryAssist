import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.providers';

@Injectable()
export class RedisService {
	public constructor(
		@Inject('REDIS_CLIENT')
		private readonly client: RedisClient
	) {}

	async set(
		key: string,
		value: string,
		expirationSeconds: number
	): Promise<void> {
		await this.client.set(key, value, 'EX', expirationSeconds);
		return;
	}

	async get(key: string): Promise<string | null> {
		return await this.client.get(key);
	}

	async del(key: string): Promise<void> {
		await this.client.del(key);
		return;
	}
}
