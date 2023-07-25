import { FcLoggerService } from '@firstclose/utilities-lib';
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
import { CreateMultipleEmploymentsRequestDto } from '../dto/create-multiple-employments-request.dto';
import { EmploymentService } from '../service/employment.service';

@ApiTags('Employment')
@Controller('loan')
export class EmploymentController {
  constructor(
    private readonly employmentService: EmploymentService,
    private readonly logger: FcLoggerService,
  ) {}

  @ApiOkResponse({
    description: 'Array of employments created with their ID assigned.',
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post(':loanId/application/:applicationId/:applicantType/employment')
  @ApiOperation({
    summary: 'Add multiple employments',
    description:
      'Add multiple employments into an a selected type from application/loan',
  })
  async create(
    @Param('loanId') loanId: string,
    @Param('applicationId') applicationId: string,
    @Param('applicantType') applicantType: string,
    @Body()
    createMultipleEmploymentsRequestDto: CreateMultipleEmploymentsRequestDto,
  ) {
    try {
      this.logger.debug('Executing Adding Employment');
      const result = await this.employmentService.createEmployments(
        loanId,
        applicationId,
        applicantType,
        createMultipleEmploymentsRequestDto,
      );
      this.logger.debug('Adding Employment executed');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
