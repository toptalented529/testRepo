import {
  FcApplicationConfigService,
  FcLoggerService,
} from '@firstclose/utilities-lib';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { CredentialsDto } from '../auth/dto';

@Injectable()
// This middleware is temporary while we make this api credentials agnostic
export class CredentialsSetterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const configService = new FcApplicationConfigService(
      new FcLoggerService(
        {
          constructor: { name: 'FcApplicationConfigService' },
        },
        req,
      ),
      req,
    );
    const logger = new FcLoggerService(
      {
        constructor: { name: 'CredentialsSetterMiddleware' },
      },
      req,
    );

    logger.debug('Setting developer connect credentials');

    const developerConnectConfig = configService.getDeveloperConnectConfig();

    if (!developerConnectConfig) {
      logger.warn('No developer connect config found');
    } else {
      const credentials: CredentialsDto = {
        consumerConnectSiteId: developerConnectConfig.consumerConnectSiteId,
        instanceId: developerConnectConfig.instanceId,
        clientId: developerConnectConfig.clientId,
        clientSecret: developerConnectConfig.clientSecret,
        username: developerConnectConfig.username,
        password: developerConnectConfig.password,
      };
      req['credentials'] = credentials;
    }

    next();
  }
}
