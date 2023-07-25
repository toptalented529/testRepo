import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BuySideDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  lockExpirationDate?: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  lockNumberOfDays?: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  baseRate?: number;
}
