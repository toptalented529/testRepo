import { Injectable } from '@nestjs/common';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { ServiceOrderResponseTypeDto } from './dto/service-order-response-dto';
import { TokenRefresherHttpServiceDecoratorService } from '../shared/service/token-refresher-http-service-decorator.service';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { map } from 'rxjs';

@Injectable()
export class ServiceOrdersService {
  constructor(
    readonly httpService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async create(
    createServiceOrderDto: CreateServiceOrderDto,
  ): Promise<ServiceOrderResponseTypeDto> {
    const id = createServiceOrderDto.loanId;
    const url = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans/${id}/serviceOrders`;
    const location = await this.httpService.post(
      url,
      createServiceOrderDto,
      {},
      map((response: AxiosResponse) => response.headers.location),
    );
    if (!location) {
      throw new Error('Service order creation failed');
    }
    return await this.httpService.get(
      `${process.env.ENCOMPASS_LOAN_BASE}${location}`,
    );
  }

  async findOne(
    serviceOrderId: string,
    loanId: string,
  ): Promise<ServiceOrderResponseTypeDto> {
    const url = `${process.env.ENCOMPASS_LOAN_BASE}/v3/loans/${loanId}/serviceOrders/${serviceOrderId}`;
    return await this.httpService.get(url);
  }
}
