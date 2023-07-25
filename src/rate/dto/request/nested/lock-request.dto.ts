import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LockRequestDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  rateStatus?: string;
}
