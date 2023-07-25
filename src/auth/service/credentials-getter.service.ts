import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CredentialsDto } from '../dto';

@Injectable()
export class CredentialsGetterService {
  constructor(@Inject(REQUEST) private readonly request) {}

  get(): CredentialsDto {
    const credentials: CredentialsDto = this.request.credentials;

    if (!credentials) {
      throw new UnauthorizedException('No credentials provided');
    }

    return credentials;
  }
}
