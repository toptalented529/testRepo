import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { DisclosuresService } from './disclosures.service';
import { getModelToken } from '@nestjs/mongoose';
import { EncompassToken } from '../../schemas/EncompassToken.schema';

describe('DisclosuresService', () => {
  let service: DisclosuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [DisclosuresService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<DisclosuresService>(DisclosuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
