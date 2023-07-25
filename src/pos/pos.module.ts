import { Module } from '@nestjs/common';
import { PosController } from './controller/pos.controller';
import { PosService } from './service/pos.service';

@Module({
  controllers: [PosController],
  providers: [PosService],
})
export class PosModule {}
