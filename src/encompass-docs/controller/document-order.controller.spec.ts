import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { DocumentOrderService } from '../service/document-order.service';
import { DocumentOrderController } from './document-order.controller';

describe('DocumentOrderController', () => {
  let controller: DocumentOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [DocumentOrderController],
      providers: [DocumentOrderService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<DocumentOrderController>(DocumentOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
