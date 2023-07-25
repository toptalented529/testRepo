import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAttachmentBodyDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'File type of the attachment to be uploaded.',
    example: 'application/pdf',
  })
  @IsString()
  contentType: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Name of the file.',
    example: 'test',
  })
  @IsString()
  name: string;
}
