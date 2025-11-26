import { Test, TestingModule } from '@nestjs/testing';
import { SupplySourceService } from './supply-source.service';

describe('SupplySourceService', () => {
	let service: SupplySourceService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SupplySourceService],
		}).compile();

		service = module.get<SupplySourceService>(SupplySourceService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
