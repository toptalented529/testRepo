import { Injectable, Logger } from '@nestjs/common';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class DisclosuresService {
  private readonly encompassBaseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans`;
  private readonly logger = new Logger(DisclosuresService.name);

  constructor(
    private readonly tokenRefresherHttpServiceDecoratorService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async getTrackingLogs(loanId: string): Promise<any> {
    this.logger.debug('Getting Developers Connect Auth token');

    const url = `${this.encompassBaseUrl}/${loanId}?view=full&entities=disclosureTracking2015Logs,documents`;
    this.logger.debug('Getting tracking logs...');
    this.logger.debug(`Endpoint ${url}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.get(url);

    this.logger.debug('Tracking logs gotten');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }

  async getRecipients(loanId: string): Promise<any> {
    this.logger.debug('Getting Developers Connect Auth token');
    this.logger.debug('Token fetched');

    const url = `${this.encompassBaseUrl}/${loanId}/recipients`;
    this.logger.debug('Getting recipients...');
    this.logger.debug(`Endpoint ${url}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.get(url);

    this.logger.debug('Recipients gotten');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
