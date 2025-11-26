import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService<AllConfigType>) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		const getDatabase2 = this.configService.get(`database`, {
			infer: true,
		});
		const db_name = process.env.DB_NAME;
		const getDatabase = this.configService.get(`database.${db_name}`, {
			infer: true,
		});

		return {
			name: this.configService.get(`database.${db_name}.name`, {
				infer: true,
			}),
			type: this.configService.get(`database.${db_name}.type`, {
				infer: true,
			}),
			// url: this.configService.get(`database.${db_name}.url`, { infer: true }),
			host: this.configService.get(`database.${db_name}.host`, {
				infer: true,
			}),
			port: this.configService.get(`database.${db_name}.port`, {
				infer: true,
			}),
			username: this.configService.get(`database.${db_name}.username`, {
				infer: true,
			}),
			password: this.configService.get(`database.${db_name}.password`, {
				infer: true,
			}),
			database: this.configService.get(`database.${db_name}.name`, {
				infer: true,
			}),
			synchronize: this.configService.get(
				`database.${db_name}.synchronize`,
				{
					infer: true,
				}
			),
			dropSchema: false,
			keepConnectionAlive: true,
			logging:
				this.configService.get('app.nodeEnv', { infer: true }) !==
				'production',
			entities: [__dirname + '/../**/*.entity{.ts,.js}'],
			migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
			cli: {
				entitiesDir: 'src',
				migrationsDir: 'src/database/migrations',
				subscribersDir: 'subscriber',
			},
			extra: {
				// based on https://node-postgres.com/apis/pool
				// max connection pool size
				max: this.configService.get(
					`database.${db_name}.maxConnections`,
					{ infer: true }
				),
				ssl: this.configService.get(`database.${db_name}.sslEnabled`, {
					infer: true,
				})
					? {
							rejectUnauthorized: this.configService.get(
								`database.${db_name}.rejectUnauthorized`,
								{ infer: true }
							),
							ca:
								this.configService.get(
									`database.${db_name}.ca`,
									{ infer: true }
								) ?? undefined,
							key:
								this.configService.get(
									`database.${db_name}.key`,
									{ infer: true }
								) ?? undefined,
							cert:
								this.configService.get(
									`database.${db_name}.cert`,
									{ infer: true }
								) ?? undefined,
						}
					: undefined,
			},
		} as TypeOrmModuleOptions;
	}
}
