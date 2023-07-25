import {
  FcApplicationConfigModule,
  FcHttpBaseModule,
  FcLoggerModule,
} from '@firstclose/utilities-lib';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { AuthCredentialsService } from './auth-credentials.service';
import { AuthGateway } from './auth-gateway.service';
import { TokenRepositoryService } from './token-repository.service';
import { TokenService } from './token.service';
import { CredentialsGetterService } from './credentials-getter.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        AuthGateway,
        TokenRepositoryService,
        {
          provide: getModelToken(EncompassToken.name),
          useValue: {},
        },
        AuthCredentialsService,
        CredentialsGetterService,
      ],
      imports: [
        FcHttpBaseModule.register(),
        FcLoggerModule,
        FcApplicationConfigModule,
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
