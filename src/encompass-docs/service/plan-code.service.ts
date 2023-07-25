import { Injectable, Logger } from '@nestjs/common';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class PlanCodeService {
  private readonly encompassBaseUrl = process.env.ENCOMPASS_DOCS_BASE;
  private readonly logger = new Logger(PlanCodeService.name);

  constructor(
    private readonly tokenRefresherHttpServiceDecoratorService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async getPlanClodes(planCodeType: string): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/planCodes?planCodeType=${planCodeType}`;
    this.logger.debug('Getting plan codes');
    this.logger.debug(`Endpoint ${url}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.get(url);

    this.logger.debug('Code Plans retrieved');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }

  async evaluate(planCodeId: string, loanId: string): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/planCodes/${planCodeId}/evaluator`;
    const request = {
      entity: {
        entityType: 'urn:elli:encompass:loan',
        entityId: loanId,
      },
      orderType: 'opening',
      import: 'all',
    };

    this.logger.debug('Getting plan codes');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(`Payload ${JSON.stringify(request)}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.post(
      url,
      request,
    );

    this.logger.debug('Plan code evaluation');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
