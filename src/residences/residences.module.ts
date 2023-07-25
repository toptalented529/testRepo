import { Module } from '@nestjs/common';
import { ResidencesController } from './controller/residences.controller';
import { ResidencesService } from './service/residences.service';

@Module({
  controllers: [ResidencesController],
  providers: [ResidencesService],
})
export class ResidencesModule {}
