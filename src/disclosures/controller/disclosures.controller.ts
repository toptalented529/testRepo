import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplatedApiException } from '../../templated-api-exception';
import { DisclosuresService } from '../service/disclosures.service';

@ApiTags('Disclosures')
@Controller('loan')
export class DisclosuresController {
  constructor(private readonly disclosuresService: DisclosuresService) {}

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Get(':loanId/disclosures/tracking-logs')
  @ApiOkResponse({
    description: 'Get tracking logs',
  })
  @ApiOperation({
    summary: 'Get tracking logs of loanId',
    description: 'Get tracking logs of loanId',
  })
  async getTrackingLogs(@Param('loanId') loanId: string): Promise<any> {
    try {
      console.log(
        `CONTROLLER: Executing Get tracking logs of loanId ${loanId}`,
      );
      const result = await this.disclosuresService.getTrackingLogs(loanId);
      console.log('CONTROLLER: Get tracking logs of loanId executed');
      return result;
    } catch (error) {
      console.error(
        `CONTROLLER_ERROR: DisclosuresController - getTrackingLogs | ${error.message}`,
      );
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
  @Get(':loanId/disclosures/recipients')
  @ApiOkResponse({
    description: 'Get recipients',
  })
  @ApiOperation({
    summary: 'Get recipients of loanId',
    description: 'Get recipients of loanId',
  })
  async getRecipients(@Param('loanId') loanId: string): Promise<any> {
    try {
      console.log(`CONTROLLER: Executing Get recipients of loanId ${loanId}`);
      const result = await this.disclosuresService.getRecipients(loanId);
      console.log('CONTROLLER: Get recipients of loanId executed');
      return result;
    } catch (error) {
      console.error(
        `CONTROLLER_ERROR: DisclosuresController - getRecipients | ${error.message}`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}
