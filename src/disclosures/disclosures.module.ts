import { Module } from '@nestjs/common';
import { DisclosuresService } from './service/disclosures.service';
import { DisclosuresController } from './controller/disclosures.controller';

@Module({
  providers: [DisclosuresService],
  controllers: [DisclosuresController],
})
export class DisclosuresModule {}
