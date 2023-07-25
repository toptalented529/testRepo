import { Injectable, Logger } from '@nestjs/common';
import { CreateDocumentOrderDto } from '../dto/request';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class DocumentOrderService {
  private readonly encompassBaseUrl = process.env.ENCOMPASS_DOCS_BASE;
  private readonly logger = new Logger(DocumentOrderService.name);

  constructor(
    private readonly tokenRefresherHttpServiceDecoratorService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async createDocumentOrder(
    createDocumentOrderDto: CreateDocumentOrderDto,
  ): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/documentOrders/opening`;
    this.logger.debug('Creating document order...');
    this.logger.debug(`Endpoint ${url}`);
    this.logger.debug(`Request ${JSON.stringify(createDocumentOrderDto)}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.post(
      url,
      createDocumentOrderDto,
    );

    this.logger.debug('Document order created');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }

  async get(documentOrderId: string): Promise<any> {
    const url = `${this.encompassBaseUrl}/v1/documentOrders/opening/${documentOrderId}`;
    this.logger.debug('Getting document order...');
    this.logger.debug(`Endpoint ${url}`);

    const data = await this.tokenRefresherHttpServiceDecoratorService.get(url);

    this.logger.debug('Loan audit gotten');
    this.logger.debug(`Response ${JSON.stringify(data)}`);

    return data;
  }
}
