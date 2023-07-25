import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';

export class SendOpeningPackageDto {
  @ApiProperty({
    type: Array,
    description: 'Documents object',
  })
  @IsArray()
  readonly documents: any[];

  @ApiProperty({
    type: Object,
    description: 'Package object',
  })
  @IsObject()
  readonly package: any;
}
