import { ApiProperty } from '@nestjs/swagger';
import { ServiceOrderRequestTypeDto } from '../dto/nested/service-order-request-type.dto';
import { IsOptional } from 'class-validator';

export class CreateServiceOrderDto {
  @ApiProperty({
    type: String,
    description: 'Loan Id',
    example: '03840429-c9ba-4b0d-bc76-2fde61ba4f56',
  })
  loanId: string;

  @ApiProperty({
    type: String,
    description: 'Service Setup ID',
    example: '03840429-c9ba-4b0d-bc76-2fde61ba4f56',
  })
  serviceSetupId: string;

  @ApiProperty({
    type: String,
    description: 'Scope',
    example: 'application:{{ApplicationId}}',
  })
  @IsOptional()
  scope: string;

  @ApiProperty({
    type: String,
    description: 'Reason',
    default: 'Manual REQUESTED',
  })
  reason: string;

  @ApiProperty({
    type: ServiceOrderRequestTypeDto,
    description: 'Request',
  })
  request: ServiceOrderRequestTypeDto;
}
