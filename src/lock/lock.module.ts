import { Module } from '@nestjs/common';
import { UnlockLoanHttpDecoratorService } from '../shared/service/unlock-loan-http-decorator.service';

import { LockService } from './service/lock.service';
import { UnlockLoanGatewayService } from './service/unlock-loan.gateway.service';

@Module({
  providers: [
    LockService,
    UnlockLoanGatewayService,
    UnlockLoanHttpDecoratorService,
  ],
  exports: [UnlockLoanHttpDecoratorService],
})
export class LockModule {}
