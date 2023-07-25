import { FcHttpBaseService, FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs';

import { AuthTokenExpiredException } from '../../auth/exception/auth-token-expired-exception';

@Injectable()
export class HttpServiceDecoratorService {
  constructor(
    private readonly httpService: FcHttpBaseService,
    private readonly logger: FcLoggerService,
  ) {}

  async get(
    url: string,
    authToken: string,
    customHeaders?: object,
    mapCallback?,
  ): Promise<any> {
    this.logger.debug(
      `Calling GET ${url} with auth token: ${authToken.substring(1, 8)}*****`,
    );
    try {
      return await this.httpService.get(
        url,
        undefined,
        this.buildRequestHeaders(authToken, customHeaders),
        mapCallback,
        undefined,
        undefined,
        catchError((error: AxiosError) => {
          if (error.response) {
            this.logger.error(
              `AXIOS_ERROR: ${JSON.stringify(error.response.data)}`,
            );
          }

          throw error;
        }),
      );
    } catch (error) {
      const isAxiosError = error.isAxiosError;
      const isTokenExpiredError = error.response.status === 401;

      if (isAxiosError && isTokenExpiredError) {
        throw new AuthTokenExpiredException();
      }

      throw error;
    }
  }

  async patch(
    url: string,
    body: object,
    authToken: string,
    customHeaders?: object,
    mapCallback?,
  ): Promise<any> {
    this.logger.debug(
      `Calling PATCH ${url} with auth token: ${authToken.substring(1, 8)}*****`,
    );
    try {
      return await this.httpService.patch(
        url,
        body,
        undefined,
        this.buildRequestHeaders(authToken, customHeaders),
        mapCallback,
        undefined,
        undefined,
        catchError((error: AxiosError) => {
          if (error.response) {
            this.logger.error(
              `AXIOS_ERROR: ${JSON.stringify(error.response.data)}`,
            );
          }

          throw error;
        }),
      );
    } catch (error) {
      const isAxiosError = error.isAxiosError;
      const isTokenExpiredError = error.response.status === 401;

      if (isAxiosError && isTokenExpiredError) {
        throw new AuthTokenExpiredException();
      }

      throw error;
    }
  }

  async post(
    url: string,
    body: object,
    authToken: string,
    customHeaders?: object,
    mapCallback?,
  ): Promise<any> {
    this.logger.debug(
      `Calling POST ${url} with auth token: ${authToken.substring(1, 8)}*****`,
    );

    try {
      return await this.httpService.post(
        url,
        body,
        undefined,
        this.buildRequestHeaders(authToken, customHeaders),
        mapCallback,
        undefined,
        undefined,
        catchError((error: AxiosError) => {
          if (error.response) {
            this.logger.error(
              `AXIOS_ERROR: ${JSON.stringify(error.response.data)}`,
            );
          }

          throw error;
        }),
      );
    } catch (error) {
      const isAxiosError = error.isAxiosError;
      const isTokenExpiredError = error.response.status === 401;

      if (isAxiosError && isTokenExpiredError) {
        throw new AuthTokenExpiredException();
      }

      throw error;
    }
  }

  async delete(
    url: string,
    authToken: string,
    params?: object,
    customHeaders?: object,
    mapCallback?: any,
    contentType?: any,
    config?: any,
  ): Promise<any> {
    this.logger.debug(
      `Calling POST ${url} with auth token: ${authToken.substring(1, 8)}*****`,
    );

    try {
      return await this.httpService.delete(
        url,
        params,
        this.buildRequestHeaders(authToken, customHeaders),
        mapCallback,
        contentType,
        config,
        catchError((error: AxiosError) => {
          if (error.response) {
            this.logger.error(
              `AXIOS_ERROR: ${JSON.stringify(error.response.data)}`,
            );
          }

          throw error;
        }),
      );
    } catch (error) {
      const isAxiosError = error.isAxiosError;
      const isTokenExpiredError = error.response.status === 401;

      if (isAxiosError && isTokenExpiredError) {
        throw new AuthTokenExpiredException();
      }

      throw error;
    }
  }

  private buildRequestHeaders(authToken: string, customHeaders?: object) {
    const mandatoryHeaders = {
      Authorization: `Bearer ${authToken}`,
    };

    let requestHeaders = mandatoryHeaders;
    if (customHeaders) {
      requestHeaders = {
        ...mandatoryHeaders,
        ...customHeaders,
      };
    }

    return requestHeaders;
  }
}
