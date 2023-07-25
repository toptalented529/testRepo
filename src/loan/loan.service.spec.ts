import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../app/global.module';
import { EncompassToken } from '../schemas/EncompassToken.schema';
import { LoanService } from './loan.service';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService],
      imports: [GlobalModule],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
