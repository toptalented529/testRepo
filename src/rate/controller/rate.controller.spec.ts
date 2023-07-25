import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { RateService } from '../service/rate.service';
import { RateController } from './rate.controller';

describe('RateController', () => {
  let controller: RateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateController],
      imports: [GlobalModule],
      providers: [RateService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<RateController>(RateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
