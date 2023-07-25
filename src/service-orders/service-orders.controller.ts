import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ServiceOrdersService } from './service-orders.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { ServiceOrderResponseTypeDto } from './dto/service-order-response-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('service-orders')
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}
  @ApiTags('Service Orders')
  @Post()
  async create(
    @Body() createServiceOrderDto: CreateServiceOrderDto,
  ): Promise<ServiceOrderResponseTypeDto> {
    return await this.serviceOrdersService.create(createServiceOrderDto);
  }

  @ApiTags('Service Orders')
  @Get(':id')
  async findOne(
    @Param('serviceOrderId') serviceOrderId: string,
    @Query('loanId') loanId: string,
  ): Promise<ServiceOrderResponseTypeDto> {
    return await this.serviceOrdersService.findOne(serviceOrderId, loanId);
  }
}
