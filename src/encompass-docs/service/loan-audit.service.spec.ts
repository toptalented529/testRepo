import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { LoanAuditService } from './loan-audit.service';

describe('LoanAuditService', () => {
  let service: LoanAuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [LoanAuditService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<LoanAuditService>(LoanAuditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
