import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class AzureCallBackDto {
	@ApiProperty({ example: '11010838' })
	@IsNotEmpty()
	id: string;

	@ApiProperty({ example: 'XXXX.company_name.com' })
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'XXXX' })
	@IsNotEmpty()
	name: string;
}

export class LogoutQueryDto {
	@ApiProperty({ example: '1' })
	@IsNotEmpty()
	id: string;
}
