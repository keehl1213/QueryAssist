import {
	Controller,
	Post,
	Body,
	HttpCode,
	BadRequestException,
	Logger,
	Headers,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import fetch from 'node-fetch';
import { AgentService } from './agent.service';
import { AgentAccessRequestDTO } from './dto/agentAccessRequest.dto';

@Controller('be-agent')
export class AgentController {
	private readonly logger = new Logger(AgentController.name);
	constructor(private readonly AgentService: AgentService) {}

	@Post('access')
	@HttpCode(200)
	@ApiBearerAuth('jwt_token')
	getAgentAccess(
		@Body()
		AgentAccessRequestDTO: AgentAccessRequestDTO,
		@Headers() headers
	) {
		this.logger.log('AgentAccessRequestDTO:', AgentAccessRequestDTO);
		try {
			return this.AgentService.getAgentAccess(
				AgentAccessRequestDTO,
				headers.authorization
			);
		} catch (error) {
			this.logger.error(error);
			throw new BadRequestException({ message: error, status: 400 });
		}
	}
}
