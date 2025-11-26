export type AppConfig = {
	nodeEnv: string;
	name: string;
	workingDirectory: string;
	frontendDomain?: string;
	backendDomain: string;
	port: number;
	apiPrefix: string;
	fallbackLanguage: string;
	headerLanguage: string;
};

export type DatabaseConfig = {
	[name: string]: {
		name?: string;
		url?: string;
		type?: string;
		host?: string;
		port?: number;
		password?: string;
		database?: string;
		username?: string;
		synchronize?: boolean;
		maxConnections: number;
		sslEnabled?: boolean;
		rejectUnauthorized?: boolean;
		ca?: string;
		key?: string;
		cert?: string;
	};
};

export type RedisConfig = {
	host: string;
	port: number;
	password: string;
};

export type FacebookConfig = {
	appId?: string;
	appSecret?: string;
};

export type AzureClientCredentialConfig = {
	auth: AzureClientCredentialAuthConfig;
};

export type AzureClientCredentialAuthConfig = {
	clientId: string;
	authority?: string;
	clientSecret?: string;
};

export type AllConfigType = {
	app: AppConfig;
	database: DatabaseConfig;
	database2: DatabaseConfig;
	azureClientCredential: AzureClientCredentialConfig;
	redis: RedisConfig;
};
