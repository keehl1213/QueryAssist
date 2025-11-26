import { registerAs } from '@nestjs/config';
import { AzureClientCredentialConfig } from './config.type';
import { IsString } from 'class-validator';
import validateConfig from '../utils/validate-config';

class EnvironmentVariablesValidator {
	@IsString()
	AAD_CLIENT_ID: string;

	@IsString()
	AAD_TENANT_ID: string;

	@IsString()
	AAD_CLIENT_SECRET: string;
}

export default registerAs<AzureClientCredentialConfig>(
	'azureClientCredential',
	() => {
		validateConfig(process.env, EnvironmentVariablesValidator);

		return {
			auth: {
				clientId: process.env.AAD_CLIENT_ID,
				authority: `https://login.microsoftonline.com/${process.env.AAD_TENANT_ID}`,
				clientSecret: process.env.AAD_CLIENT_SECRET,
			},
		};
	}
);
