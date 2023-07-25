import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken } from '@nestjs/mongoose';
import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { AttachmentsService } from '../service/attachments.service';
import { AttachmentsController } from './attachments.controller';

describe('AttachmentsController', () => {
  let controller: AttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachmentsController],
      providers: [AttachmentsService],
      imports: [GlobalModule],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<AttachmentsController>(AttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
