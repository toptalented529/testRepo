import { FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';

import { LockedLoanError } from '../../auth/exception/locked-loan-error';
import { UnlockLoanGatewayService } from '../../lock/service/unlock-loan.gateway.service';
import { TokenRefresherHttpServiceDecoratorService } from './token-refresher-http-service-decorator.service';

@Injectable()
export class UnlockLoanHttpDecoratorService {
  constructor(
    private readonly httpServiceDecorator: TokenRefresherHttpServiceDecoratorService,
    private readonly unlockLoanGatewayService: UnlockLoanGatewayService,
    private readonly logger: FcLoggerService,
  ) {}

  async get(url: string, headers?: object, mapCallback?): Promise<any> {
    return await this.httpServiceDecorator.get(url, headers, mapCallback);
  }

  async patch(
    url: string,
    body: object,
    headers?: object,
    mapCallback?,
  ): Promise<any> {
    try {
      return await this.httpServiceDecorator.patch(
        url,
        body,
        headers,
        mapCallback,
      );
    } catch (error: any) {
      if (!(typeof error === 'object' && error instanceof LockedLoanError)) {
        throw error;
      }

      this.logger.debug('Loan is locked. Trying to unlock loan...');
      const loanId = error.loanId;
      await this.unlockLoanGatewayService.unlockLoan(loanId);

      return await this.httpServiceDecorator.patch(
        url,
        body,
        headers,
        mapCallback,
      );
    }
  }

  async post(
    url: string,
    body: object,
    headers?: object,
    mapCallback?,
  ): Promise<any> {
    try {
      return await this.httpServiceDecorator.post(
        url,
        body,
        headers,
        mapCallback,
      );
    } catch (error: any) {
      if (!(typeof error === 'object' && error instanceof LockedLoanError)) {
        throw error;
      }

      this.logger.debug('Loan is locked. Trying to unlock loan...');
      const loanId = error.loanId;
      await this.unlockLoanGatewayService.unlockLoan(loanId);

      return await this.httpServiceDecorator.post(
        url,
        body,
        headers,
        mapCallback,
      );
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
    return await this.httpServiceDecorator.delete(
      url,
      params,
      customHeaders,
      mapCallback,
      contentType,
      config,
    );
  }
}
