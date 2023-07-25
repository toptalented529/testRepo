import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthTokenDto {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  token_type: string;
}
