import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicantTypeEnum } from '../../shared/dto/enum';
import { TemplatedApiException } from '../../templated-api-exception';
import { CreateResidenceDto } from '../dto/request';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { ResidencesService } from '../service/residences.service';

@ApiTags('Residences')
@Controller('loan')
export class ResidencesController {
  constructor(
    private readonly residencesService: ResidencesService,
    private readonly logger: FcLoggerService,
  ) {}

  @Post(':loanId/application/:applicationId/:applicantType/residences')
  @ApiParam({
    name: 'loanId',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'applicationId',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'applicantType',
    enum: ApplicantTypeEnum,
    required: true,
  })
  @ApiOkResponse({
    description: 'Array of residences created with their ID assigned.',
  })
  @ApiOperation({
    summary: 'Add multiple residences',
    description: 'Add multiple residences into a application/loan',
  })
  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  async create(
    @Param('loanId')
    loanId: string,
    @Param('applicationId') applicationId: string,
    @Param('applicantType', new ParseEnumPipe(ApplicantTypeEnum))
    applicantType: string,
    @Body()
    createResidencesDto: CreateResidenceDto[],
  ) {
    try {
      this.logger.debug('Executing Adding Residences.');
      const result = await this.residencesService.createResidence(
        loanId,
        applicationId,
        applicantType,
        createResidencesDto,
      );
      this.logger.debug('Adding Residences executed.');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
