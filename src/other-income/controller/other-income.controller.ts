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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplatedApiException } from '../../templated-api-exception';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { CreateMultipleOtherIncomesRequestDto } from '../dto';
import { OtherIncomeService } from '../service/other-income.service';

@ApiTags('OtherIncome')
@Controller('loan')
export class OtherIncomeController {
  constructor(
    private readonly otherIncomeService: OtherIncomeService,
    private readonly logger: FcLoggerService,
  ) {}

  @ApiOkResponse({
    description: 'Array of other incomes created with their ID assigned.',
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post(':loanId/application/:applicationId/otherIncomes')
  @ApiOperation({
    summary: 'Add multiple other incomes',
    description: 'Add multiple other incomess into a application/loan',
  })
  async create(
    @Param('loanId') loanId: string,
    @Param('applicationId') applicationId: string,
    @Body()
    createMultipleOtherIncomesRequestDto: CreateMultipleOtherIncomesRequestDto,
  ) {
    try {
      this.logger.debug('Executing Adding Other Incomes.');
      const result = await this.otherIncomeService.createOtherIncomes(
        loanId,
        applicationId,
        createMultipleOtherIncomesRequestDto,
      );
      this.logger.debug('SAdding OtherIncome executed.');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
