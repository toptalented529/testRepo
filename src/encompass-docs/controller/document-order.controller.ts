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

import { FcLoggerService } from '@firstclose/utilities-lib';
import { TemplatedApiException } from '../../templated-api-exception';
import { CreateDocumentOrderDto } from '../dto/request';
import { DocumentOrderService } from '../service/document-order.service';

@ApiTags('Document Orders')
@Controller('encompassdocs')
@UsePipes(new ValidationPipe(valOptions))
export class DocumentOrderController {
  constructor(
    private readonly documentOrderService: DocumentOrderService,
    private readonly logger: FcLoggerService,
  ) {}

  @TemplatedApiException(() => [
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
  ])
  @Post('documentOrders/opening')
  @ApiOperation({
    summary: 'Creates the document package',
    description: 'Creates document package for initial disclosures. ',
  })
  async createDocumentOrder(
    @Body()
    createDocumentOrderDto: CreateDocumentOrderDto,
  ): Promise<any> {
    try {
      this.logger.debug('Executing creation of Document Order');
      const result = await this.documentOrderService.createDocumentOrder(
        createDocumentOrderDto,
      );
      this.logger.debug('Creation of Document Order executed');
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
  @Get('documentOrders/opening/:documentOrderId')
  @ApiOperation({
    summary: 'Returns document order details',
    description: 'Returns document order details',
  })
  async get(@Param('documentOrderId') documentOrderId: string): Promise<any> {
    try {
      this.logger.debug('Executing Get of Document order');
      const result = await this.documentOrderService.get(documentOrderId);
      this.logger.debug('Get of Document order executed');
      return result;
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw new InternalServerErrorException(error);
    }
  }
}
