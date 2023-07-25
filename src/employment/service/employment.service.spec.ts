import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { EmploymentService } from './employment.service';

describe('EmploymentService', () => {
  let service: EmploymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [EmploymentService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    service = module.get<EmploymentService>(EmploymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
