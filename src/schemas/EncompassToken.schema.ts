import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsString } from 'class-validator';
import { AuthTokenDto } from '../auth/dto';

@Schema({ timestamps: true })
export class EncompassToken {
  constructor(
    applicationName: string,
    developerConnectAuthToken: AuthTokenDto,
  ) {
    this.clientId = applicationName;
    this.authToken = developerConnectAuthToken;
  }

  @Prop()
  @ApiProperty({
    type: String,
  })
  @IsString()
  readonly clientId: string;

  @Prop()
  @ApiProperty({
    type: String,
  })
  @IsInstance(AuthTokenDto)
  authToken: AuthTokenDto;
}

export const EncompassTokenSchema =
  SchemaFactory.createForClass(EncompassToken);
