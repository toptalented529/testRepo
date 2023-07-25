import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { DisclosuresService } from '../service/disclosures.service';
import { DisclosuresController } from './disclosures.controller';
import { getModelToken } from '@nestjs/mongoose';
import { EncompassToken } from '../../schemas/EncompassToken.schema';

describe('DisclosuresController', () => {
  let controller: DisclosuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [DisclosuresController],
      providers: [DisclosuresService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<DisclosuresController>(DisclosuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
