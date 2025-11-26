import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class GetAccountByEmployeeIdDto {
	@ApiProperty({ example: '11010838' })
	@IsNotEmpty()
	employee_id: string;
}
