import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { LoanAuditService } from '../service/loan-audit.service';
import { LoanAuditController } from './loan-audit.controller';

describe('LoanAuditController', () => {
  let controller: LoanAuditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [LoanAuditController],
      providers: [LoanAuditService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<LoanAuditController>(LoanAuditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
