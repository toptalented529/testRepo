import { IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLoanDto {
  @ApiProperty()
  @IsJSON()
  data: JSON;
}
