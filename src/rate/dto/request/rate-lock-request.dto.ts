import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BuySideDto, LockRequestDto } from './nested';

export class RateLockRequestDto {
  @ApiProperty({
    type: LockRequestDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LockRequestDto)
  lockRequest?: LockRequestDto;

  @ApiProperty({
    type: BuySideDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BuySideDto)
  buySide?: BuySideDto;
}
