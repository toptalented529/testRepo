import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    type: String,
    description: 'ID',
    example: '0e1a3745-7e9a-4113-857e-d2cd416b2c59',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Listing Name',
    example: 'FirstClose-VG',
  })
  listingName: string;
}
