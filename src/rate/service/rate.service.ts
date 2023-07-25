import { Injectable } from '@nestjs/common';

import { UnlockLoanHttpDecoratorService } from '../../shared/service/unlock-loan-http-decorator.service';
import { RateLockRequestDto } from '../dto/request';

@Injectable()
export class RateService {
  private readonly encompassBaseUrl = process.env.ENCOMPASS_LOAN_BASE;

  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
  ) {}

  async rateLockLoan(loanId: string, rateLockRequest: RateLockRequestDto) {
    const url = `${this.encompassBaseUrl}/v1/loans/${loanId}/ratelockRequests?action=confirm&view=entity`;
    console.log('SERVICE: Rate Lock Loan processing...');
    console.log(`SERVICE: Endpoint ${url}`);
    console.log(`SERVICE: Request ${JSON.stringify(rateLockRequest)}`);

    const data = await this.httpServiceDecorator.post(url, rateLockRequest);

    console.log('SERVICE: Rate Lock Loan processed');
    console.log(`SERVICE: Response ${JSON.stringify(data)}`);

    return data;
  }
}
