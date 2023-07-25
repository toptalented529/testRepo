import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { OtherIncomeService } from './other-income.service';

describe('OtherIncomeService', () => {
  let service: OtherIncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [OtherIncomeService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<OtherIncomeService>(OtherIncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
