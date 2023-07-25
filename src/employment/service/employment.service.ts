import { FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import { UnlockLoanHttpDecoratorService } from '../../shared/service/unlock-loan-http-decorator.service';
import { CreateMultipleEmploymentsRequestDto } from '../dto/create-multiple-employments-request.dto';

@Injectable()
export class EmploymentService {
  private readonly encompassBaseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans`;

  constructor(
    private readonly httpServiceDecorator: UnlockLoanHttpDecoratorService,
    private readonly logger: FcLoggerService,
  ) {}

  async createEmployments(
    loanId: string,
    applicationId: string,
    applicantType: string,
    createMultipleEmploymentsRequestDto: CreateMultipleEmploymentsRequestDto,
  ) {
    const url = `${this.encompassBaseUrl}/${loanId}/applications/${applicationId}/${applicantType}/employment?action=add&view=entity`;
    this.logger.debug('Adding employments...');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(
      `Request ${JSON.stringify(createMultipleEmploymentsRequestDto)}`,
    );

    const data = await this.httpServiceDecorator.patch(
      url,
      createMultipleEmploymentsRequestDto.employments,
    );

    this.logger.debug('Employments added');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
