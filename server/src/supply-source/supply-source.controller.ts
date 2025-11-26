import {
	Controller,
	Post,
	Body,
	HttpCode,
	BadRequestException,
	Logger,
	Get,
	Param,
	Res,
	Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import fetch from 'node-fetch';
import { SupplySourceService } from './supply-source.service';
import { BackOrderShortageInquireRequestDTO } from './dto/backOrderShortageInquireRequest.dto';
import { Response, Request } from 'express';
import { Readable } from 'stream';

@Controller('supply-source')
export class SupplySourceController {
	private readonly logger = new Logger(SupplySourceController.name);
	constructor(private readonly SupplySourceService: SupplySourceService) {}

	@Get('trendchart/:region/:pn')
	@HttpCode(200)
	@ApiBearerAuth('jwt_token')
	async getTrendChart(
		@Param('region') region: string,
		@Param('pn') pn: string,
		@Res() res: Response,
		@Req() req: Request
	): Promise<void> {
		const token = req.cookies['Authorization'];
		if (!token) {
			throw new BadRequestException({
				message: 'Missing Authorization Token',
				status: 401,
			});
		}

		this.logger.log(
			`Fetching trend chart for region: ${region}, pn: ${pn}`
		);
		try {
			const result = await this.SupplySourceService.getTrendChart(
				region,
				pn,
				token
			);
			// 設置 Header，根據 Picture MIME 來設置
			res.setHeader('Content-Type', 'image/png'); // 確保是 PNG 格式，如果可能較為動態，可傳遞 Content-Type
			const nodeStream = Readable.from(result);
			nodeStream.pipe(res).on('error', (err) => {
				this.logger.error(`Stream error: ${err.message}`);
				res.status(500).send('Error streaming image');
			});
		} catch (error) {
			this.logger.error(error);
			throw new BadRequestException({ message: error, status: 400 });
		}
	}
}
