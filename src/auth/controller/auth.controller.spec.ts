import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import {
  FcApplicationConfigModule,
  FcHttpBaseModule,
  FcLoggerModule,
} from '@firstclose/utilities-lib';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { AuthCredentialsService } from '../service/auth-credentials.service';
import { AuthGateway } from '../service/auth-gateway.service';
import { TokenRepositoryService } from '../service/token-repository.service';
import { TokenService } from '../service/token.service';
import { AuthController } from './auth.controller';
import { CredentialsGetterService } from '../service/credentials-getter.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthGateway,
        TokenService,
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
