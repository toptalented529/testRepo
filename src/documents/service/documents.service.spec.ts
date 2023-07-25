import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [DocumentsService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
