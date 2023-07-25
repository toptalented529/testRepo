import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { OtherIncomeService } from '../service/other-income.service';
import { OtherIncomeController } from './other-income.controller';

describe('OtherIncomeController', () => {
  let controller: OtherIncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [OtherIncomeController],
      providers: [OtherIncomeService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<OtherIncomeController>(OtherIncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
