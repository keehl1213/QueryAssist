import { LoggerMiddleware } from './loggerMiddleware';

describe('LoggerMiddleware', () => {
	it('should be defined', () => {
		expect(new LoggerMiddleware()).toBeDefined();
	});
});
