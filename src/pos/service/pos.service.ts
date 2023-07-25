import { FcHttpBaseService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import {
  CreatePackageDto,
  CreateSessionDto,
  PosCredentialDto,
} from '../dto/request';
import { PackageCreatedDto } from '../dto/response';

@Injectable()
export class PosService {
  private readonly DEFAULT_API_ROOT_PARTNER_URL = 'https://api.elliemae.com';

  constructor(private readonly httpService: FcHttpBaseService) {}

  async createPackage(
    createPackageDto: CreatePackageDto,
    posCredentialDto: PosCredentialDto,
    apiRootPartnerUrl?: string,
  ): Promise<PackageCreatedDto> {
    const url = `${
      apiRootPartnerUrl ?? this.DEFAULT_API_ROOT_PARTNER_URL
    }/packages`;

    const headers = {
      'Elli-Environment': posCredentialDto.env,
      'Elli-SubscriptionId': posCredentialDto.susbcriptionid,
      'Elli-SigningKeyId': posCredentialDto.signingkeyid,
      'Elli-Signature': posCredentialDto.signature,
    };

    return await this.httpService.post(
      url,
      createPackageDto,
      undefined,
      headers,
    );
  }

  async createSession(
    createSessionDto: CreateSessionDto,
    posCredentialDto: PosCredentialDto,
    apiRootPartnerUrl?: string,
  ) {
    const url = `${
      apiRootPartnerUrl ?? this.DEFAULT_API_ROOT_PARTNER_URL
    }/pos/v1/sessions`;

    const headers = {
      'Elli-Environment': posCredentialDto.env,
      'Elli-SubscriptionId': posCredentialDto.susbcriptionid,
      'Elli-SigningKeyId': posCredentialDto.signingkeyid,
      'Elli-Signature': posCredentialDto.signature,
    };

    return await this.httpService.post(
      url,
      createSessionDto,
      undefined,
      headers,
    );
  }
}
