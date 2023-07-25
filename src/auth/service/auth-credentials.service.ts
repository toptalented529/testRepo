import { Injectable } from '@nestjs/common';
import { AuthTokenParamsDto } from '../dto';
import { CredentialsGetterService } from './credentials-getter.service';

@Injectable()
export class AuthCredentialsService {
  constructor(
    private readonly credentialsGetterService: CredentialsGetterService,
  ) {}

  getCredentialsForPassword(): AuthTokenParamsDto {
    const credentials = this.credentialsGetterService.get();

    return {
      grant_type: 'client_credentials',
      username: credentials.username,
      password: credentials.password,
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      scope: 'lp',
    };
  }

  getCredentialsForClientCredentials(): AuthTokenParamsDto {
    const credentials = this.credentialsGetterService.get();

    return {
      grant_type: 'client_credentials',
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      scope: 'lp',
      instance_id: credentials.instanceId,
    };
  }
}
