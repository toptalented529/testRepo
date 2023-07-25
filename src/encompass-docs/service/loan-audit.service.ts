import { Injectable, Logger } from '@nestjs/common';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class LoanAuditService {
  private readonly encompassBaseUrl = process.env.ENCOMPASS_DOCS_BASE;
  private readonly logger = new Logger(LoanAuditService.name);

  constructor(
    private readonly tokenRefresherHttpServiceDecoratorService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async createOpeningAudit(loanAuditRequest: any): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/documentAudits/opening`;
    this.logger.debug('Creating loan audit...');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(`Request ${JSON.stringify(loanAuditRequest)}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.post(
      url,
      loanAuditRequest,
    );

    this.logger.debug('Loan audit created');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }

  async get(auditId: string): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/documentAudits/opening/${auditId}`;
    this.logger.debug('Getting loan audit...');
    this.logger.debug(`Endpoint ${url}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.get(url);

    this.logger.debug('Loan audit gotten');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
