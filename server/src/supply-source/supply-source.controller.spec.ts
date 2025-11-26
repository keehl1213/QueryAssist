import { Test, TestingModule } from '@nestjs/testing';
import { SupplySourceController } from './supply-source.controller';

describe('SupplySourceController', () => {
	let controller: SupplySourceController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SupplySourceController],
		}).compile();

		controller = module.get<SupplySourceController>(SupplySourceController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
