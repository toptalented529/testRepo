import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { ResidencesService } from '../service/residences.service';
import { ResidencesController } from './residences.controller';

describe('ResidencesController', () => {
  let controller: ResidencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [ResidencesController],
      providers: [ResidencesService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<ResidencesController>(ResidencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
