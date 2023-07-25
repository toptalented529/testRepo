import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { ResidencesService } from './residences.service';

describe('ResidencesService', () => {
  let service: ResidencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [ResidencesService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<ResidencesService>(ResidencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
