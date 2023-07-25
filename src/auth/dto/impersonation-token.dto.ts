import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImpersonationTokenDto {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  issued_token_type: string;

  @ApiProperty()
  @IsString()
  token_type: string;
}
