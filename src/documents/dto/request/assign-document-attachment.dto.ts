import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssingDocumentAttachmentDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier assigned to the attachment. ',
  })
  @IsNotEmpty()
  @IsString()
  readonly entityId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'attachment',
    description: 'The entity type is "attachment".',
  })
  @IsNotEmpty()
  @IsString()
  readonly entityType: string;
}
