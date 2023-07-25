import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class IntrospectionTokenInfo {
  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsString()
  scope: string;

  @ApiProperty()
  @IsString()
  client_id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  token_type: string;

  @ApiProperty()
  @IsNumber()
  exp: number;

  @ApiProperty()
  @IsString()
  sub: string;

  @ApiProperty()
  @IsString()
  bearer_token: string;

  @ApiProperty()
  @IsString()
  encompass_instance_id: string;

  @ApiProperty()
  @IsString()
  user_name: string;

  @ApiProperty()
  @IsString()
  user_key: string;

  @ApiProperty()
  @IsString()
  encompass_user: string;

  @ApiProperty()
  @IsString()
  identity_type: string;

  @ApiProperty()
  @IsString()
  encompass_instance_type: string;

  @ApiProperty()
  @IsString()
  encompass_client_id: string;

  @ApiProperty()
  @IsString()
  realm_name: string;
}
