import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AttachmentsController } from './controller/attachments.controller';
import { AttachmentsService } from './service/attachments.service';

@Module({
  imports: [ConfigModule],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule {}
