import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttachmentsModule } from '../attachments/attachments.module';
import { BorrowerModule } from '../borrower/borrower.module';
import { DisclosuresModule } from '../disclosures/disclosures.module';
import { DocumentsModule } from '../documents/documents.module';
import { EmploymentController } from '../employment/controller/employment.controller';
import { EmploymentModule } from '../employment/employment.module';
import { EncompassDocsModule } from '../encompass-docs/encompass-docs.module';
import { LoanController } from '../loan/loan.controller';
import { LoanModule } from '../loan/loan.module';
import { RequestLoggerMiddleware } from '../middleware/request-logger.middleware';
import { OtherIncomeModule } from '../other-income/other-income.module';
import { RateModule } from '../rate/rate.module';
import { ResidencesModule } from '../residences/residences.module';
import { GlobalModule } from './global.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '../health/health.module';
import { LockModule } from '../lock/lock.module';
import {
  FcApplicationConfigMiddleware,
  FcApplicationConfigModule,
} from '@firstclose/utilities-lib';
import { CredentialsSetterMiddleware } from '../middleware/credentials-setter.middleware';
import { PosModule } from '../pos/pos.module';
import { ServiceOrdersModule } from 'src/service-orders/service-orders.module';

@Module({
  imports: [
    GlobalModule,
    HealthModule,
    LoanModule,
    BorrowerModule,
    DocumentsModule,
    AttachmentsModule,
    EmploymentModule,
    OtherIncomeModule,
    ResidencesModule,
    RateModule,
    EncompassDocsModule,
    DisclosuresModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env['MONGODB_CONNECTION_STRING']),
    LockModule,
    PosModule,
    FcApplicationConfigModule,
    ServiceOrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // This middleware is temporary to not break VG.
        (req: any, res: any, next: () => void) => {
          const applicationId = req.headers['application-id'];

          if (!applicationId) {
            console.warn(
              `application-id header not explicitly provided. Defaulting to FC Internal application-id`,
            );
            req.headers['application-id'] = '1_ice_default_application';
          }

          next();
        },
      )
      .forRoutes('*');
    consumer.apply(FcApplicationConfigMiddleware).forRoutes('*');
    consumer.apply(CredentialsSetterMiddleware).forRoutes('*');
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes(EmploymentController, LoanController);
  }
}
