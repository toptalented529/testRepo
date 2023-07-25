import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { OtherIncomeDescriptionValuesEnum, OwnerTypeEnum } from './enum';

export class CreateOtherIncomeRequestDto {
  @ApiProperty({
    enum: OwnerTypeEnum,
    description: 'Other Incomes owner (Borrower or CoBorrower)',
    example: 'Borrower',
    required: true,
  })
  @IsEnum(OwnerTypeEnum)
  owner: OwnerTypeEnum;

  @ApiProperty({
    enum: OtherIncomeDescriptionValuesEnum,
    description: 'Other income source description.',
    example: 'AccessoryUnitIncome',
    required: false,
  })
  @IsOptional()
  @IsEnum(OtherIncomeDescriptionValuesEnum)
  description?: OtherIncomeDescriptionValuesEnum;

  @ApiProperty({
    type: Number,
    description: 'Monthly amount from other income.',
    example: 2000,
    required: true,
  })
  @IsNumber()
  @Min(0)
  monthlyAmount: number;
}
