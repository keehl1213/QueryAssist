import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AgentAccessRequestDTO {
	/**
	 * 詢問Agent的問題
	 *
	 * @example "BO status of M98828-001 in NA region"
	 */
	@ApiProperty({ example: 'BO status of M98828-001 in NA region' })
	@IsNotEmpty()
	question?: string | null | undefined;
}
