import { Module } from '@nestjs/common';
import { DocumentsService } from './service/documents.service';
import { DocumentsController } from './controller/documents.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
