import { Injectable } from '@nestjs/common';
import {
  BindBorrowerToLoanBody,
  BindBorrowerToLoanResponse,
  BorrowerContactInfo,
  BorrowerUuid,
  GetBorrowerUuidParams,
} from '../dto/borrower.dto';
import { TokenRefresherHttpServiceDecoratorService } from '../../shared/service/token-refresher-http-service-decorator.service';

@Injectable()
export class BorrowerService {
  constructor(
    private readonly tokenRefresherHttpServiceDecoratorService: TokenRefresherHttpServiceDecoratorService,
  ) {}

  async getBorrowerUuid(
    getBorrowerUuidParams: GetBorrowerUuidParams,
  ): Promise<BorrowerUuid> {
    const url = new URL('https://api.elliemae.com/platform/v1/jwt/subject');
    url.searchParams.append('identityType', getBorrowerUuidParams.identityType);
    url.searchParams.append('instanceId', getBorrowerUuidParams.instanceId);
    url.searchParams.append('realm', getBorrowerUuidParams.realm);
    url.searchParams.append('userId', getBorrowerUuidParams.userId);

    return await this.tokenRefresherHttpServiceDecoratorService.get(
      url.toString(),
    );
  }

  async getBorrowerContactInfo(loanId: string): Promise<BorrowerContactInfo[]> {
    const url = `${process.env.ENCOMPASS_LOAN_BASE}/v0.9/loans/${loanId}/contacts`;
    try {
      return await this.tokenRefresherHttpServiceDecoratorService.get(url);
    } catch (err) {
      throw {
        statusCode: 400,
        message: `No UUID has been found for this borrower. Please bind the borrower to loan: ${loanId}.`,
      };
    }
  }

  async bindBorrowerToLoan(
    bindBorrowerToLoanBody: BindBorrowerToLoanBody,
  ): Promise<BindBorrowerToLoanResponse> {
    // POST Contact Info
    const url = `${process.env.ENCOMPASS_LOAN_BASE}/v0.9/tokens?bindingOnly=true`;

    return await this.tokenRefresherHttpServiceDecoratorService.post(
      url,
      bindBorrowerToLoanBody,
    );
  }
}
