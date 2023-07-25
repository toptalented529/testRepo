import { ApiProperty } from '@nestjs/swagger';
import { ServiceSetupDto } from './nested/service-setup.dto';
import { ServiceOrderRequestTypeDto } from './nested/service-order-request-type.dto';
import { EntityRefDto } from './nested/entity-ref-type.dto';

export class ServiceOrderResponseTypeDto {
  @ApiProperty({
    type: String,
    description: 'Source',
    example: 'urn:elli:application:developerconnect',
  })
  source: string;
  @ApiProperty({
    type: ServiceSetupDto,
    description: 'Service Setup',
  })
  serviceSetup: ServiceSetupDto;

  @ApiProperty({
    type: String,
    description: 'Reason',
    example: 'Manual REQUESTED',
  })
  reason: string;

  @ApiProperty({
    type: ServiceOrderRequestTypeDto,
    description: 'Request',
  })
  request: ServiceOrderRequestTypeDto;

  @ApiProperty({
    type: String,
    description: 'Status',
    example: 'REQUESTED',
  })
  status: string;

  @ApiProperty({
    type: EntityRefDto,
    description: 'Entity Ref',
  })
  entityRef: EntityRefDto;

  @ApiProperty({
    type: String,
    description: 'Scope',
    example: 'application:{{ApplicationId}}',
  })
  scope: string;

  @ApiProperty({
    type: String,
    description: 'legacyScope',
    example: 'application:_borrower1',
  })
  legacyScope: string;

  @ApiProperty({
    type: String,
    description: 'type',
    example: 'MANUAL',
  })
  type: string;

  @ApiProperty({
    type: String,
    description: 'vendorPlatform',
    example: 'EPC2',
  })
  vendorPlatform: string;

  @ApiProperty({
    type: String,
    description: 'tenant',
    example: 'urn:elli:encompass:be11204006',
  })
  tenant: string;

  @ApiProperty({
    type: String,
    description: 'id',
    example: '0e1a3745-7e9a-4113-857e-d2cd416b2c59',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'transactionId',
    example: '57bcf6e6-ec45-413d-90a7-3d8dbb79711f',
  })
  transactionId: string;

  @ApiProperty({
    type: String,
    description: 'created',
    example: '2021-03-04T18:00:00.000Z',
  })
  created: string;

  @ApiProperty({
    type: String,
    description: 'createdBy',
    example: 'urn:elli:encompass:be11204006:users:1',
  })
  createdBy: string;

  @ApiProperty({
    type: String,
    description: 'lastUpdated',
    example: '2021-03-04T18:00:00.000Z',
  })
  lastUpdated: string;
}
