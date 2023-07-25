import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { REQUEST } from '@nestjs/core';
import { AuthTokenExpiredException } from '../../auth/exception/auth-token-expired-exception';
import { LockedLoanError } from '../../auth/exception/locked-loan-error';
import { TokenService } from '../../auth/service/token.service';
import { LockedLoanErrorValidatorService } from '../../lock/service/locked-loan-error-validator.service';
import { HttpServiceDecoratorService } from './http-service-decorator.service';
import { CredentialsGetterService } from '../../auth/service/credentials-getter.service';

// This service contains httpService methods. Before calling httpService,
// auth token is retrieved from cache. If httpService call fails, the new token will be
// issued, saved in cache and the httpService will be called again with the new token.
@Injectable()
export class TokenRefresherHttpServiceDecoratorService {
  constructor(
    private readonly httpServiceDecorator: HttpServiceDecoratorService,
    private readonly tokenService: TokenService,
    private readonly logger: FcLoggerService,
    private readonly credentialsGetterService: CredentialsGetterService,
  ) {}

  async get(url: string, headers?: object, mapCallback?): Promise<any> {
    const clientId = this.credentialsGetterService.get().clientId;

    try {
      const cachedAuthToken = await this.tokenService.getCachedToken(clientId);

      return await this.httpServiceDecorator.get(
        url,
        cachedAuthToken.authToken.access_token,
        headers,
        mapCallback,
      );
    } catch (error: any) {
      if (
        typeof error === 'object' &&
        error instanceof AuthTokenExpiredException
      ) {
        this.logger.debug('Token is expired, getting the new token');

        const newAuthToken = await this.tokenService.getAndSaveNewAuthToken(
          clientId,
        );

        return await this.httpServiceDecorator.get(
          url,
          newAuthToken.access_token,
          mapCallback,
        );
      }

      if (LockedLoanErrorValidatorService.isLoanLockedError(error)) {
        throw new LockedLoanError(error);
      }

      throw error;
    }
  }

  async patch(
    url: string,
    body: object,
    headers?: object,
    mapCallback?,
  ): Promise<any> {
    const clientId = this.credentialsGetterService.get().clientId;

    try {
      const cachedAuthToken = await this.tokenService.getCachedToken(clientId);

      return await this.httpServiceDecorator.patch(
        url,
        body,
        cachedAuthToken.authToken.access_token,
        headers,
        mapCallback,
      );
    } catch (error: any) {
      if (
        typeof error === 'object' &&
        error instanceof AuthTokenExpiredException
      ) {
        this.logger.debug('Token is expired, getting the new token');

        const newAuthToken = await this.tokenService.getAndSaveNewAuthToken(
          clientId,
        );

        return await this.httpServiceDecorator.patch(
          url,
          body,
          newAuthToken.access_token,
          headers,
          mapCallback,
        );
      }

      if (LockedLoanErrorValidatorService.isLoanLockedError(error)) {
        throw new LockedLoanError(error);
      }

      throw error;
    }
  }

  async post(
    url: string,
    body: object,
    headers?: object,
    mapCallback?,
  ): Promise<any> {
    const clientId = this.credentialsGetterService.get().clientId;

    try {
      const cachedAuthToken = await this.tokenService.getCachedToken(clientId);

      return await this.httpServiceDecorator.post(
        url,
        body,
        cachedAuthToken.authToken.access_token,
        headers,
        mapCallback,
      );
    } catch (error: any) {
      if (
        typeof error === 'object' &&
        error instanceof AuthTokenExpiredException
      ) {
        this.logger.debug('Token is expired, getting the new token');

        const newAuthToken = await this.tokenService.getAndSaveNewAuthToken(
          clientId,
        );

        return await this.httpServiceDecorator.post(
          url,
          body,
          newAuthToken.access_token,
          mapCallback,
        );
      }

      if (LockedLoanErrorValidatorService.isLoanLockedError(error)) {
        throw new LockedLoanError(error);
      }

      throw error;
    }
  }

  async delete(
    url: string,
    params?: object,
    customHeaders?: object,
    mapCallback?: any,
    contentType?: any,
    config?: any,
  ): Promise<any> {
    const clientId = this.credentialsGetterService.get().clientId;

    try {
      const cachedAuthToken = await this.tokenService.getCachedToken(clientId);

      return await this.httpServiceDecorator.delete(
        url,
        cachedAuthToken.authToken.access_token,
        params,
        customHeaders,
        mapCallback,
        contentType,
        config,
      );
    } catch (error: any) {
      if (
        typeof error === 'object' &&
        error instanceof AuthTokenExpiredException
      ) {
        this.logger.debug('Token is expired, getting the new token');

        const newAuthToken = await this.tokenService.getAndSaveNewAuthToken(
          clientId,
        );

        return await this.httpServiceDecorator.delete(
          url,
          newAuthToken.access_token,
          params,
          customHeaders,
          mapCallback,
          contentType,
          config,
        );
      }

      if (LockedLoanErrorValidatorService.isLoanLockedError(error)) {
        throw new LockedLoanError(error);
      }

      throw error;
    }
  }
}
