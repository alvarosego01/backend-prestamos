import { Module } from '@nestjs/common';
import { CobradoresController } from './controller/controller.index';

@Module({
  controllers: [CobradoresController]
})
export class CobradoresModule {}
