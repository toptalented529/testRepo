import { FcLoggerService } from '@firstclose/utilities-lib';
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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { valOptions } from '../../app/api-config';
import { TemplatedApiException } from '../../templated-api-exception';
import { SendOpeningPackageDto } from '../dto/request';
import { SendOpeningPackageService } from '../service/send-opening-package.service';

@ApiTags('Send Opening Package')
@Controller('encompassdocs')
@UsePipes(new ValidationPipe(valOptions))
export class SendOpeningPackageController {
  constructor(
    private readonly sendOpeningPackageService: SendOpeningPackageService,
    private readonly logger: FcLoggerService,
  ) {}

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post('documentOrders/opening/:documentOrderId/delivery')
  @ApiOperation({
    summary: 'Send Opening Package',
    description: 'Send opening package for initial disclosures. ',
  })
  async send(
    @Param('documentOrderId') documentOrderId: string,
    @Body()
    sendOpeningPackageDto: SendOpeningPackageDto,
  ): Promise<any> {
    try {
      this.logger.debug('Executing send opening package');
      const result = await this.sendOpeningPackageService.sendOpeningPackage(
        documentOrderId,
        sendOpeningPackageDto,
      );
      this.logger.debug('Send opening package executed');
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
  @Get('documentOrders/opening/:documentOrderId/delivery/:jobId')
  @ApiOperation({
    summary: 'Returns the details of send opening package',
    description: 'Returns the details of send opening package',
  })
  async get(
    @Param('documentOrderId') documentOrderId: string,
    @Param('jobId') jobId: string,
  ): Promise<any> {
    try {
      this.logger.debug('Executing Get of Send Opening Package detail');
      const result = await this.sendOpeningPackageService.get(
        documentOrderId,
        jobId,
      );
      this.logger.debug('Get of Send Opening Package detail executed');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
