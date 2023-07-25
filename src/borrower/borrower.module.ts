import { Module } from '@nestjs/common';
import { BorrowerController } from './controller/borrower.controller';
import { BorrowerService } from './service/borrower.service';

@Module({
  controllers: [BorrowerController],
  providers: [BorrowerService],
})
export class BorrowerModule {}
