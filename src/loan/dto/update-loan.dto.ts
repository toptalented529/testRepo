import { IsJSON, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLoanDto {
  @ApiProperty()
  @IsString()
  applicationTakenMethodType: string;
}
export class UpdatedLoanDto {
  @ApiProperty()
  @IsJSON()
  data: JSON;
}
