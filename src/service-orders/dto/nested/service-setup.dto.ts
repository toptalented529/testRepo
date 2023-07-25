import { ApiProperty } from '@nestjs/swagger';
import { Product } from './service-setup-product-type.dto';

export class ServiceSetupDto {
  @ApiProperty({
    type: String,
    description: 'ID',
    example: '03840429-c9ba-4b0d-bc76-2fde61ba4f56',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Category',
    example: 'APPRAISAL',
  })
  category: string;

  @ApiProperty({
    type: Product,
    description: 'Product',
  })
  product: Product;
}
