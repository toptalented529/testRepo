import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { DocumentOrderService } from './document-order.service';

describe('DocumentOrderService', () => {
  let service: DocumentOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [DocumentOrderService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<DocumentOrderService>(DocumentOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
