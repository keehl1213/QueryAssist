import { Module } from '@nestjs/common';
import { SupplySourceController } from './supply-source.controller';
import { SupplySourceService } from './supply-source.service';

@Module({
	controllers: [SupplySourceController],
	providers: [SupplySourceService],
})
export class SupplySourceModule {}
