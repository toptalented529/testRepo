import { ApiProperty } from '@nestjs/swagger';

export class EntityRefDto {
  @ApiProperty({
    type: String,
    description: 'entityId',
    example:
      'urn:elli:encompass:BE11204006:loan:460f443b-de58-40ce-a026-f9d687e21fce',
  })
  entityId: string;

  @ApiProperty({
    type: String,
    description: 'entityType',
    example: 'urn:elli:encompass:loan',
  })
  entityType: string;
}
