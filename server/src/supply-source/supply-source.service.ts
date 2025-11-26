import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { BackOrderShortageInquireRequestDTO } from './dto/backOrderShortageInquireRequest.dto';

@Injectable()
export class SupplySourceService {
	private readonly logger = new Logger(SupplySourceService.name);
	public async getTrendChart(
		region: string,
		pn: string,
		token: string
	): Promise<any> {
		try {
			const url = `${process.env.SOURCE_URL}/api/AccountabilityTrend/getChartImage/${region}/${pn}`;
			const result = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			if (!result.ok) {
				// 如果响应状态码不是 2xx，抛出错误以进行后续处理
				return result.json().then((errorData) => {
					this.logger.log('errorData:', errorData);
					const error = new BadRequestException(errorData);
					throw error;
				});
			}
			return result.body;
		} catch (error) {
			this.logger.error(`Fetch Error: ${error}`);
			throw new BadRequestException('Failed to fetch trend chart data');
		}
	}
}
