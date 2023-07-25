import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDocumentOrderDto {
  @ApiProperty({
    type: String,
    description: 'Audit Id',
  })
  @IsString()
  readonly auditId: string;

  @ApiProperty({
    type: String,
    description: 'Print mode',
  })
  @IsString()
  readonly printMode: string;
}
