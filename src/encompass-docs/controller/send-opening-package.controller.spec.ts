import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { GlobalModule } from '../../app/global.module';
import { EncompassToken } from '../../schemas/EncompassToken.schema';
import { SendOpeningPackageService } from '../service/send-opening-package.service';
import { SendOpeningPackageController } from './send-opening-package.controller';

describe('SendOpeningPackageController', () => {
  let controller: SendOpeningPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      controllers: [SendOpeningPackageController],
      providers: [SendOpeningPackageService],
    })
      .overrideProvider(getModelToken(EncompassToken.name))
      .useValue({})
      .compile();

    controller = module.get<SendOpeningPackageController>(
      SendOpeningPackageController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
