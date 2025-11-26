import { Provider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import Redis from 'ioredis';

export type RedisClient = Redis;

export const RedisProvider: Provider = {
	useFactory: (configService: ConfigService<AllConfigType>): RedisClient => {
		const logger = new Logger('RedisClient');
		const client = new Redis({
			host: configService.get('redis.host', { infer: true }),
			port: configService.get('redis.port', { infer: true }),
			password: configService.get('redis.password', { infer: true }),
			retryStrategy(times) {
				const delay = Math.min(times * 50, 2000);
				return delay;
			},
		});

		client.on('connect', () => {
			logger.log('Redis client connected');
		});

		client.on('ready', () => {
			logger.log('Redis client ready');
		});

		client.on('error', (err) => {
			logger.error('Redis client error', err);
		});

		client.on('end', () => {
			logger.log('Redis client disconnected');
		});

		client.on('reconnecting', (delay) => {
			logger.log(`Redis client reconnecting in ${delay}ms`);
		});

		return client;
	},
	provide: 'REDIS_CLIENT',
	inject: [ConfigService],
};
