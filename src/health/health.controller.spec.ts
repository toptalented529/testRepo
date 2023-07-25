import { HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;
  let healthCheckExecutor: HealthCheckExecutor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [HealthCheckExecutor, HealthCheckService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    healthCheckExecutor = module.get<HealthCheckExecutor>(HealthCheckExecutor);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
