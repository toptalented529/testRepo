import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { EmploymentService } from '../service/employment.service';
import { EmploymentController } from './employment.controller';

describe('EmploymentController', () => {
  let controller: EmploymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [EmploymentController],
      providers: [EmploymentService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<EmploymentController>(EmploymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
