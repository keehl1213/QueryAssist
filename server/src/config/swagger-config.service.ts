import {
	DocumentBuilder,
	SwaggerCustomOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { swaggerRoute, prefix } from '../constant/DEFINE';

export class SwaggerConfig {
	static setup(app: INestApplication): void {
		const builder = new DocumentBuilder();
		const config = builder
			.setTitle('QueryAssist API')
			.setDescription('This is QueryAssist API docs.')
			.setVersion('1.0')
			.addServer(prefix)
			.addApiKey(
				{
					type: 'apiKey',
					in: 'header',
					name: 'authorization', // 你可以根據需要更改這個名稱
				},
				'jwt_token' // 這個是用來識別 API Key 的名稱
			)
			.build();

		const document = SwaggerModule.createDocument(app, config);
		const swaggerOptions: SwaggerCustomOptions = {
			explorer: true, // 開啟搜尋列
		};
		SwaggerModule.setup(swaggerRoute, app, document, swaggerOptions);
	}
}
