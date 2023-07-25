import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../app/global.module';
import { EncompassToken } from '../schemas/EncompassToken.schema';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

describe('LoanController', () => {
  let controller: LoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [LoanService],
      imports: [GlobalModule],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<LoanController>(LoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
