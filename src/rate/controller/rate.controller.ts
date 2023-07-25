import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { TemplatedApiException } from '../../templated-api-exception';
import { RateLockRequestDto } from '../dto/request';
import { RateService } from '../service/rate.service';

@ApiTags('Rate')
@Controller('loan')
export class RateController {
  constructor(
    private readonly rateService: RateService,
    private readonly logger: FcLoggerService,
  ) {}

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post(':loanId/ratelockRequests')
  @ApiOperation({
    summary: 'Lock Rate',
    description: 'Lock the rate of a loan',
  })
  async rateLockLoan(
    @Param('loanId') loanId: string,
    @Body() rateLockRequest: RateLockRequestDto,
  ) {
    try {
      this.logger.debug('Executing Rate Lock Loan');
      const result = await this.rateService.rateLockLoan(
        loanId,
        rateLockRequest,
      );
      this.logger.debug('Rate Lock Loan executed');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
