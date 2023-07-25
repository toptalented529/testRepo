import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthTokenParamsDto {
  @ApiProperty()
  @IsString()
  grant_type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  client_id: string;

  @ApiProperty()
  @IsString()
  client_secret: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  scope?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instance_id?: string;
}
