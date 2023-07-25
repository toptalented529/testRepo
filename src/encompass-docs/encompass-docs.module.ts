import { Module } from '@nestjs/common';

import { AuthGateway } from '../auth/service/auth-gateway.service';
import { DocumentOrderController } from './controller/document-order.controller';
import { LoanAuditController } from './controller/loan-audit.controller';
import { PlanCodeController } from './controller/plan-codes.controller';
import { SendOpeningPackageController } from './controller/send-opening-package.controller';
import { DocumentOrderService } from './service/document-order.service';
import { LoanAuditService } from './service/loan-audit.service';
import { PlanCodeService } from './service/plan-code.service';
import { SendOpeningPackageService } from './service/send-opening-package.service';

@Module({
  controllers: [
    LoanAuditController,
    DocumentOrderController,
    SendOpeningPackageController,
    PlanCodeController,
  ],
  providers: [
    LoanAuditService,
    AuthGateway,
    DocumentOrderService,
    SendOpeningPackageService,
    PlanCodeService,
  ],
})
export class EncompassDocsModule {}
