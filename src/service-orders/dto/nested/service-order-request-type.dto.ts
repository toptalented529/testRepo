import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ServiceOrderRequestTypeDto {
  @ApiProperty({
    type: String,
    description: 'Type',
    example: 'Valuation Order',
  })
  type: string;

  @ApiProperty({
    type: Object,
    description: 'Options',
  })
  @IsOptional()
  options: object;
}
