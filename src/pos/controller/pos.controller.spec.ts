import { FcHttpBaseModule, FcLoggerModule } from '@firstclose/utilities-lib';
import { Test, TestingModule } from '@nestjs/testing';
import { PosService } from '../service/pos.service';
import { PosController } from './pos.controller';

describe('PosController', () => {
  let controller: PosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FcHttpBaseModule.register(), FcLoggerModule],
      controllers: [PosController],
      providers: [PosService],
    }).compile();

    controller = module.get<PosController>(PosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
