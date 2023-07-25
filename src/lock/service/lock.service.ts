import { Injectable } from '@nestjs/common';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class LockService {
  private readonly baseUrl = `${process.env.ENCOMPASS_LOAN_BASE}/v3/resourceLocks`;

  constructor(
    private readonly httpService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async getLocks(loanId: string): Promise<any> {
    const url = `${this.baseUrl}?resourceType=loan&resourceId=${loanId}`;

    return await this.httpService.get(url);
  }

  async deleteLock(loanId: string, lockId: string): Promise<any> {
    // Not sure if we should force the unlock
    const url = `${this.baseUrl}/${lockId}?resourceType=loan&force=true&resourceId=${loanId}`;

    return await this.httpService.delete(url);
  }
}
