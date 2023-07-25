import { FcLoggerService } from '@firstclose/utilities-lib';
import { Injectable } from '@nestjs/common';
import { LockService } from './lock.service';

@Injectable()
export class UnlockLoanGatewayService {
  constructor(
    private readonly lockService: LockService,
    private readonly logger: FcLoggerService,
  ) {}

  async unlockLoan(loanId: string): Promise<void> {
    this.logger.debug('Getting locks..');
    const locks = await this.lockService.getLocks(loanId);
    this.logger.debug('Locks gotten successfully');

    for (const lock of locks) {
      const lockId = lock.id;
      this.logger.debug(`Deleting lock ${lockId}`);

      await this.lockService.deleteLock(loanId, lockId);

      this.logger.debug('Lock deleted successfully');
    }
  }
}
