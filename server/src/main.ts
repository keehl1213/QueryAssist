import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	INestApplication,
	Logger,
	ValidationPipe,
	ExceptionFilter,
} from '@nestjs/common';
import * as session from 'express-session';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { InternalServerErrorExceptionFilter } from './filters/internal-server-error-exception.filter';
import { CorsOptionsDelegate } from './config/cors-options.delegate';
import { SwaggerConfig } from './config/swagger-config.service';
import { TimeInterceptor } from './utils/timer.interceptor';
import { prefix } from './constant/DEFINE';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// 在 NestJS 中，透過 enableCors 來設定 CORS (Cross-Origin Resource Sharing)
	app.enableCors(CorsOptionsDelegate);

	app.use(cookieParser());

	// store session by redis in production
	const isSessionSecure = process.env.NODE_ENV === 'production';
	app.use(
		session({
			// Generate a random session secret if not provided.
			secret: 'session_secret##',
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: isSessionSecure,
				maxAge: 60 * 60 * 1000, // 1 hour
			},
		})
	);

	// 使用Swagger配置
	if (process.env.NODE_ENV !== 'production') {
		SwaggerConfig.setup(app);
	}

	app.setGlobalPrefix(prefix);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	// 透過 useGlobalInterceptors 來指定全域的 Interceptor
	app.useGlobalInterceptors(new TimeInterceptor()); // 計算時間

	// 透過 useGlobalFilters 來指定全域的 Exception filter
	const filters: ExceptionFilter<unknown>[] = [
		new EntityNotFoundExceptionFilter(),
		new UnauthorizedExceptionFilter(),
		new InternalServerErrorExceptionFilter(),
	];
	filters.forEach((filter) => app.useGlobalFilters(filter));

	await app.listen(process.env.APP_PORT);
}

bootstrap();
