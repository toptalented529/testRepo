import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  instanceId: string;

  @ApiProperty()
  @IsString()
  groupNamespace: string;

  @ApiProperty()
  @IsString()
  groupId: string;

  @ApiProperty()
  @IsString()
  packageId: string;

  @ApiProperty()
  @IsString()
  recipientId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  returnUrl: string;
}
