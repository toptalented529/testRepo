import { ApiProperty } from '@nestjs/swagger';

export class DisclosureWidgetDto {
  @ApiProperty({
    type: String,
    description: 'Package id',
  })
  readonly packageId: string;

  @ApiProperty({
    type: String,
    description: 'Lat id',
  })
  readonly latId: string;
}
