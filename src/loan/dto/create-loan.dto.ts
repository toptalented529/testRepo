import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLoanDto {
  @ApiProperty()
  @IsString()
  applicationTakenMethodType: string;
}

export class CreatedLoanDto {
  @ApiProperty()
  @IsString()
  id: string;
}
