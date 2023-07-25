import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The title of the document.',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'The description of the document.',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly applicationId?: string;
}
