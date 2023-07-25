import { Injectable } from '@nestjs/common';

import { FcLoggerService } from '@firstclose/utilities-lib';
import { UnlockLoanHttpDecoratorService } from '../../shared/service/unlock-loan-http-decorator.service';
import { CreateResidenceDto } from '../dto/request';

@Injectable()
export class ResidencesService {
  private readonly encompassBaseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans`;

  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
    private readonly logger: FcLoggerService,
  ) {}

  async createResidence(
    loanId: string,
    applicationId: string,
    applicantType: string,
    createResidencesDto: CreateResidenceDto[],
  ) {
    const url = `${this.encompassBaseUrl}/${loanId}/applications/${applicationId}/${applicantType}/residences?action=add&view=entity`;
    this.logger.debug('Adding residences...');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(`Request ${JSON.stringify(createResidencesDto)}`);

    const data = await this.httpServiceDecorator.patch(
      url,
      createResidencesDto,
    );

    this.logger.debug('Residences added');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
