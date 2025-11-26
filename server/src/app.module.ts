import {
	Module,
	NestModule,
	MiddlewareConsumer,
	Logger,
	RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from './middlewares/loggerMiddleware';
import { AuthorizationMiddleware } from './middlewares/authorizationMiddleware';
import { AuthorizationMSALMiddleware } from './middlewares/authorizationMSALMiddleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AzureModule } from './azure/azure.module';
import { SupplySourceModule } from './supply-source/supply-source.module';
import { AgentModule } from './agent/agent.module';
import { AccountModule } from './account/account.module';
import databaseConfig from './config/database.config';
import azureConfig from './config/azure.config';
import redisConfig from './config/redis.config';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'), // 设置提供靜態文件目錄為 "public"
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, azureConfig, redisConfig],
			envFilePath: ['.env'],
		}),
		TypeOrmModule.forRootAsync({
			name: process.env.DB_NAME,
			useClass: TypeOrmConfigService,
			dataSourceFactory: async (
				options: DataSourceOptions | undefined
			) => {
				if (!options) {
					throw new Error(
						`${process.env.DB_NAME} DataSourceOptions are undefined.`
					);
				}
				return new DataSource(options).initialize();
			},
		}),
		RedisModule,
		AzureModule,
		SupplySourceModule,
		AgentModule,
		AccountModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
		consumer
			.apply(AuthorizationMSALMiddleware)
			.forRoutes({ path: '/be-agent/**', method: RequestMethod.ALL });
		consumer
			.apply(AuthorizationMiddleware)
			.exclude(
				'/queryassist',
				'/azure/callOBOGraphAPI/:token', // 排除azure/callOBOGraphAPI/:token路由
				'/azure/callback', // 排除azure/callback路由
				'/azure/logout', // 排除azure/logout路由
				'/be-agent/(.*)',
				'/supply-source/trendchart/(.*)'
			)
			.forRoutes('*'); // 对所有路由生效÷
	}
}
