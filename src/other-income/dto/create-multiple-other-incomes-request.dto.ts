import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

import { CreateOtherIncomeRequestDto } from '.';

export class CreateMultipleOtherIncomesRequestDto {
  @ApiProperty({ type: () => [CreateOtherIncomeRequestDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOtherIncomeRequestDto)
  otherIncomes: CreateOtherIncomeRequestDto[];
}
