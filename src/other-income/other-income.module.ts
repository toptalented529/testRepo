import { Module } from '@nestjs/common';
import { AuthGateway } from '../auth/service/auth-gateway.service';
import { OtherIncomeController } from './controller/other-income.controller';
import { OtherIncomeService } from './service/other-income.service';

@Module({
  controllers: [OtherIncomeController],
  providers: [OtherIncomeService, AuthGateway],
})
export class OtherIncomeModule {}
