import { FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import { AuthTokenDto, AuthTokenParamsDto } from '../dto';
import { IEncompassToken } from '../interface/application.interface';
import { AuthGateway } from './auth-gateway.service';
import { TokenRepositoryService } from './token-repository.service';

@Injectable()
export class TokenService {
  private static TOKEN_EXPIRATION_SEC_FOR_EXTERNAL_CONSUMERS = 600;

  constructor(
    private readonly authGateway: AuthGateway,
    private readonly tokenRepositoryService: TokenRepositoryService,
    private readonly logger: FcLoggerService,
  ) {}

  // Get cached token if exists.
  // If it was issued more than 10 min ago, then renew the token
  async getAuthTokenForExternalConsumer(
    tokenRequestBody: AuthTokenParamsDto,
  ): Promise<AuthTokenDto> {
    const cachedAuthTokenDocument = await this.getCachedToken(
      tokenRequestBody.client_id,
      tokenRequestBody,
    );

    if (
      true ===
      this.isExternalConsumerTokenExpired(cachedAuthTokenDocument.updatedAt)
    ) {
      this.logger.debug(
        `Token for external consumer expired, requestion the new one. clientId: ${tokenRequestBody.client_id}`,
      );

      return await this.getAndSaveNewAuthToken(
        tokenRequestBody.client_id,
        tokenRequestBody,
      );
    }

    return cachedAuthTokenDocument.authToken;
  }

  async getCachedToken(
    clientId: string,
    credentials?: AuthTokenParamsDto,
  ): Promise<IEncompassToken> {
    let cachedAuthToken: IEncompassToken;

    const cachedAuthTokenDocument = await this.tokenRepositoryService.get(
      clientId,
    );

    // Condition for the first call: there are no token in DB for the application
    if (null === cachedAuthTokenDocument) {
      let newToken: AuthTokenDto;
      if (credentials) {
        newToken = await this.authGateway.getNewAuthTokenByCredentials(
          credentials,
        );
      } else {
        newToken = await this.authGateway.getNewAuthTokenFromRequest();
      }
      console.log(newToken);

      cachedAuthToken = await this.tokenRepositoryService.create(
        clientId,
        newToken,
      );
    } else {
      cachedAuthToken = cachedAuthTokenDocument;
    }

    return cachedAuthToken;
  }

  async getAndSaveNewAuthToken(
    clientId: string,
    credentials?: AuthTokenParamsDto,
  ): Promise<AuthTokenDto> {
    let newToken: AuthTokenDto;
    if (credentials) {
      newToken = await this.authGateway.getNewAuthTokenByCredentials(
        credentials,
      );
    } else {
      newToken = await this.authGateway.getNewAuthTokenFromRequest();
    }

    await this.tokenRepositoryService.updateAuthToken(clientId, newToken);

    return newToken;
  }

  private isExternalConsumerTokenExpired(updatedAt: Date): boolean {
    const updatedAtTime = updatedAt.getTime();
    const currentTime = new Date().getTime();

    const diffInSec = (currentTime - updatedAtTime) / 1000;

    return diffInSec > TokenService.TOKEN_EXPIRATION_SEC_FOR_EXTERNAL_CONSUMERS;
  }
}
