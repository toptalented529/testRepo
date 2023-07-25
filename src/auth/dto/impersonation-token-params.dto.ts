import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { SubjectUserIdType } from '../type';
import { AuthTokenParamsDto } from './auth-token-params.dto';

export class ImpersonationTokenParamsDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AuthTokenParamsDto)
  authTokenParams: AuthTokenParamsDto;

  @ApiProperty()
  @IsString()
  grant_type: string;

  @ApiProperty()
  @IsString()
  actor_token_type: string;

  @ApiProperty()
  @IsString()
  subject_user_id: SubjectUserIdType;
}
