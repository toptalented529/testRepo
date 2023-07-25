import {
  FcApplicationConfigModule,
  FcHttpBaseModule,
  FcHttpBaseService,
  FcLoggerModule,
  FcLoggerService,
} from '@firstclose/utilities-lib';
import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { TokenRepositoryService } from './token-repository.service';
import { CredentialsGetterService } from './credentials-getter.service';

describe('TokenRepositoryService', () => {
  let service: TokenRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenRepositoryService,
        {
          provide: getModelToken(EncompassToken.name),
          useValue: {},
        },
        CredentialsGetterService,
      ],
      imports: [
        FcHttpBaseModule.register(),
        FcLoggerModule,
        FcApplicationConfigModule,
      ],
    }).compile();

    service = module.get<TokenRepositoryService>(TokenRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
