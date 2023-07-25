import { Injectable, Logger } from '@nestjs/common';
import { SendOpeningPackageDto } from '../dto/request';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class SendOpeningPackageService {
  private readonly encompassBaseUrl = process.env.ENCOMPASS_DOCS_BASE;
  private readonly logger = new Logger(SendOpeningPackageService.name);

  constructor(
    private readonly tokenRefresherHttpServiceDecoratorService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async sendOpeningPackage(
    documentOrderId: string,
    sendOpeningPackageDto: SendOpeningPackageDto,
  ): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/documentOrders/opening/${documentOrderId}/delivery`;
    this.logger.debug('Send opening package');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(`Request ${JSON.stringify(sendOpeningPackageDto)}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.post(
      url,
      sendOpeningPackageDto,
    );

    this.logger.debug('Sent');
    this.logger.debug(
      `Send opening package ${documentOrderId} Response ${JSON.stringify(
        data,
      )}`,
    );

    return data;
  }

  async get(documentOrderId: string, jobId: string): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/documentOrders/opening/${documentOrderId}/delivery/${jobId}`;
    this.logger.debug('Getting opening package detail...');
    this.logger.debug(`Endpoint ${url}`);
    const data = this.tokenRefresherHttpServiceDecoratorService.get(url);

    this.logger.debug(`Opening package detailResponse ${JSON.stringify(data)}`);

    return data;
  }
}
