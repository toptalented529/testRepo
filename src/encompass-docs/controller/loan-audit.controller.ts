import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { TemplatedApiException } from '../../templated-api-exception';
import { LoanAuditService } from '../service/loan-audit.service';

@ApiTags('Loan Audit')
@Controller('encompassdocs')
export class LoanAuditController {
  constructor(
    private readonly loanAuditService: LoanAuditService,
    private readonly logger: FcLoggerService,
  ) {}

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post('documentAudits/opening')
  @ApiOperation({
    summary: 'Creates the initial audit job',
    description:
      'Creates the initial audit job for an opening order, which is typical for initial disclosures. ',
  })
  async createOpeningAudit(
    @Body()
    loanAuditRequest: any,
  ): Promise<any> {
    try {
      this.logger.debug('Executing creation of Loan Audit');
      const result = await this.loanAuditService.createOpeningAudit(
        loanAuditRequest,
      );
      this.logger.debug('Creation of loan audit executed');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Get('documentAudits/opening/:auditId')
  @ApiOperation({
    summary: 'Returns the status of an opening audit request.',
    description: 'Returns the status of an opening audit request.',
  })
  async get(@Param('auditId') auditId: string): Promise<any> {
    try {
      this.logger.debug('Executing retrieval of Loan Audit');
      const result = await this.loanAuditService.get(auditId);
      this.logger.debug('Retrieval of audit executed');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
