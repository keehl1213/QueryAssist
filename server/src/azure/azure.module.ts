import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { CodeEntity } from './entities/code.entity';
import { WwHcmWaEmployeeinfoGEntity } from './entities/wwHcmWaEmployeeinfoG.entity';
import { ConfigService } from '@nestjs/config';
import { AccountModule } from '../account/account.module';
import { RedisModule } from '../redis/redis.module'; // 確保路徑正確
import { AccountService } from '../account/account.service'; // 確保路徑正確

@Module({
	imports: [
		TypeOrmModule.forFeature(
			[AccountEntity, CodeEntity, WwHcmWaEmployeeinfoGEntity],
			process.env.DB_NAME
		),
		AccountModule,
		RedisModule,
	],
	controllers: [AzureController],
	providers: [AzureService, ConfigService, AccountService],
})
export class AzureModule {}
