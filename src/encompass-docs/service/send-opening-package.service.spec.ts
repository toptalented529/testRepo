import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { SendOpeningPackageService } from './send-opening-package.service';

describe('SendOpeningPackageService', () => {
  let service: SendOpeningPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [SendOpeningPackageService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<SendOpeningPackageService>(SendOpeningPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
