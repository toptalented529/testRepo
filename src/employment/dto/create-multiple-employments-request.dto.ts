import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateEmploymentRequestDto } from './create-employment-request.dto';

export class CreateMultipleEmploymentsRequestDto {
  @ApiProperty({ type: [CreateEmploymentRequestDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateEmploymentRequestDto)
  @IsNotEmpty()
  employments: CreateEmploymentRequestDto[];
}
