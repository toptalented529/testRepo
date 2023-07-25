import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { TemplatedApiException } from '../../templated-api-exception';
import { PlanCodeService } from '../service/plan-code.service';

@ApiTags('Plan Codes')
@Controller('encompassdocs')
export class PlanCodeController {
  constructor(
    private readonly planCodeService: PlanCodeService,
    private readonly logger: FcLoggerService,
  ) {}

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Get('planCodes')
  @ApiOperation({
    summary: 'Plan codes',
    description: 'Get plan codes from instance',
  })
  async getPlanCodes(
    @Query('planCodeType')
    planCodeType: string,
  ): Promise<any> {
    try {
      this.logger.debug('Getting plan codes');
      const result = await this.planCodeService.getPlanClodes(planCodeType);
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
  @Post('planCodes/:planCodeId/evaluate')
  @ApiOperation({
    summary: 'Evaluate plan code for loanId',
    description: 'Evaluate plan code for loanId',
  })
  async planCodeEvaluate(
    @Param('planCodeId') planCodeId: string,
    @Query('loanId')
    loanId: string,
  ): Promise<any> {
    try {
      this.logger.debug('Evaluating plan code');
      const result = await this.planCodeService.evaluate(planCodeId, loanId);
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
