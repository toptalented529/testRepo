import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import {
  FcApplicationConfigModule,
  FcHttpBaseModule,
  FcLoggerModule,
} from '@firstclose/utilities-lib';
import { AuthModule } from '../../auth/auth.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { LockService } from './lock.service';
import { UnlockLoanGatewayService } from './unlock-loan.gateway.service';

describe('LockService', () => {
  let service: LockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        FcHttpBaseModule.register(),
        FcLoggerModule,
        FcApplicationConfigModule,
      ],
      providers: [UnlockLoanGatewayService, LockService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<LockService>(LockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
