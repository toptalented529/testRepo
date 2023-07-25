import { FcHttpBaseModule, FcLoggerModule } from '@firstclose/utilities-lib';
import { Test, TestingModule } from '@nestjs/testing';
import { PosService } from './pos.service';

describe('PosService', () => {
  let service: PosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FcHttpBaseModule.register(), FcLoggerModule],
      providers: [PosService],
    }).compile();

    service = module.get<PosService>(PosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
