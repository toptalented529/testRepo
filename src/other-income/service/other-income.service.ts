import { Injectable } from '@nestjs/common';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { UnlockLoanHttpDecoratorService } from '../../shared/service/unlock-loan-http-decorator.service';
import { CreateMultipleOtherIncomesRequestDto } from '../dto';

@Injectable()
export class OtherIncomeService {
  private readonly encompassBaseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans`;

  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
    private readonly logger: FcLoggerService,
  ) {}

  async createOtherIncomes(
    loanId: string,
    applicationId: string,
    createMultipleOtherIncomesRequestDto: CreateMultipleOtherIncomesRequestDto,
  ) {
    const url = `${this.encompassBaseUrl}/${loanId}/applications/${applicationId}/otherIncomeSources?action=add&view=entity`;
    this.logger.debug('Adding other incomes...');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(
      `Request ${JSON.stringify(createMultipleOtherIncomesRequestDto)}`,
    );

    const data = await this.httpServiceDecorator.patch(
      url,
      createMultipleOtherIncomesRequestDto.otherIncomes,
    );

    this.logger.debug('Other incomes added');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
