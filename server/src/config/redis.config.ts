import { registerAs } from '@nestjs/config';
import { RedisConfig } from './config.type';
import { IsInt, Min, Max, IsString } from 'class-validator';
import validateConfig from '../utils/validate-config';

class EnvironmentVariablesValidator {
	@IsString()
	REDIS_HOST: string;

	@IsInt()
	@Min(0)
	@Max(65535)
	REDIS_PORT: number;

	@IsString()
	REDIS_PASS: string;
}

export default registerAs<RedisConfig>('redis', () => {
	validateConfig(process.env, EnvironmentVariablesValidator);

	return {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT, 10),
		password: process.env.REDIS_PASS,
	};
});
