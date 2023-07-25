import { FcHttpBaseService } from '@firstclose/utilities-lib';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { map } from 'rxjs';

import {
  AuthTokenDto,
  AuthTokenParamsDto,
  ImpersonationTokenDto,
  ImpersonationTokenParamsDto,
  IntrospectionTokenBodyDto,
  IntrospectionTokenInfo,
  RevokeTokenBodyDto,
} from '../dto';
import { GrantType } from '../type';
import { AuthCredentialsService } from './auth-credentials.service';

@Injectable()
export class AuthGateway {
  private readonly tokenUrl = process.env.TOKEN_URL;

  constructor(
    private readonly httpService: FcHttpBaseService,
    private readonly authCredentialsResolver: AuthCredentialsService,
  ) {}

  async getNewAuthTokenByCredentials(
    tokenRequestBody: AuthTokenParamsDto,
  ): Promise<AuthTokenDto> {
    const params = new URLSearchParams();
    for (const [property, value] of Object.entries(tokenRequestBody)) {
      params.set(property, value);
    }

    return await this.httpService.post(
      this.tokenUrl,
      params,
      undefined,
      undefined,
      undefined,
      'application/x-www-form-urlencoded',
    );
  }

  async getNewAuthTokenFromRequest(
    grantType?: GrantType,
  ): Promise<AuthTokenDto> {
    if (grantType === 'password') {
      const credentials =
        this.authCredentialsResolver.getCredentialsForPassword();

      return await this.getNewAuthTokenByCredentials(credentials);
    }

    // Right now the default is 'client_credentials'
    const credentials =
      this.authCredentialsResolver.getCredentialsForClientCredentials();
    return await this.getNewAuthTokenByCredentials(credentials);
  }

  async getImpersonationToken(
    authToken: AuthTokenDto,
    impersonationTokenParamsDto: ImpersonationTokenParamsDto,
  ): Promise<ImpersonationTokenDto> {
    if (!impersonationTokenParamsDto.authTokenParams.scope) {
      throw new InternalServerErrorException(
        'Scope is obligatory to get an impersonation token.',
      );
    }

    const params = new URLSearchParams({
      grant_type: impersonationTokenParamsDto.grant_type,
      actor_token_type: impersonationTokenParamsDto.actor_token_type,
      subject_user_id: impersonationTokenParamsDto.subject_user_id,
      actor_token: authToken.access_token,
      scope: impersonationTokenParamsDto.authTokenParams.scope,
      client_id: impersonationTokenParamsDto.authTokenParams.client_id,
      client_secret: impersonationTokenParamsDto.authTokenParams.client_secret,
    });

    return await this.httpService.post(
      this.tokenUrl,
      params,
      undefined,
      undefined,
      undefined,
      'application/x-www-form-urlencoded',
    );
  }

  async getImpersonationTokenFromRequest(
    authToken: AuthTokenDto,
  ): Promise<ImpersonationTokenDto> {
    const credentials =
      this.authCredentialsResolver.getCredentialsForPassword();

    return await this.getImpersonationToken(authToken, {
      authTokenParams: credentials,
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      actor_token_type: 'urn:ietf:params:oauth:token-type:access_token',
      subject_user_id: 'loan.officer',
    });
  }

  async tokenIntrospection(
    introspectionTokenBody: IntrospectionTokenBodyDto,
  ): Promise<IntrospectionTokenInfo> {
    const params = new URLSearchParams();
    params.append('client_id', introspectionTokenBody.client_id);
    params.append('client_secret', introspectionTokenBody.client_secret);
    params.append('token', introspectionTokenBody.token);

    return await this.httpService.post(
      'https://api.elliemae.com/oauth2/v1/token/introspection',
      params,
      undefined,
      undefined,
      undefined,
      'application/x-www-form-urlencoded',
    );
  }

  async revokeToken(revokeTokenBody: RevokeTokenBodyDto): Promise<any> {
    const params = new URLSearchParams();
    params.append('client_id', revokeTokenBody.client_id);
    params.append('client_secret', revokeTokenBody.client_secret);
    params.append('token', revokeTokenBody.token);

    return await this.httpService.post(
      'https://api.elliemae.com/oauth2/v1/token/revocation',
      params,
      undefined,
      undefined,
      map((response: AxiosResponse) => response.status),
      'application/x-www-form-urlencoded',
    );
  }
}
