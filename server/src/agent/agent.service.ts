import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AgentAccessRequestDTO } from './dto/agentAccessRequest.dto';

@Injectable()
export class AgentService {
	private readonly logger = new Logger(AgentService.name);
	public async getAgentAccess(
		AgentAccessRequestDTO: AgentAccessRequestDTO,
		authorization: string
	): Promise<any> {
		try {
			const result = await fetch(
				`${process.env.AISERVER_URL}/api/agent/access`,
				{
					method: 'POST',
					body: JSON.stringify(AgentAccessRequestDTO),
					headers: {
						'Content-Type': 'application/json',
						Authorization: authorization,
					},
				}
			);

			if (!result.ok) {
				// 如果响应状态码不是 2xx，抛出错误以进行后续处理
				return result.json().then((errorData) => {
					this.logger.log('errorData:', errorData);
					const error = new BadRequestException(errorData);
					throw error;
				});
			}
			return result.json();
		} catch (errorData) {
			this.logger.error(`Fetch Error: ${errorData}`);
			const error = new BadRequestException(errorData);
			throw error;
		}
	}
}
