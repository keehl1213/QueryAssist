import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter
	implements ExceptionFilter<EntityNotFoundError>
{
	public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		return response.status(HttpStatus.NOT_FOUND).json({
			message: {
				statusCode: HttpStatus.NOT_FOUND,
				error: 'NOT FOUND DATA',
				message: exception.message,
			},
		});
	}
}
