import { Module } from '@nestjs/common';
import { EmploymentController } from './controller/employment.controller';
import { EmploymentService } from './service/employment.service';

@Module({
  controllers: [EmploymentController],
  providers: [EmploymentService],
})
export class EmploymentModule {}
