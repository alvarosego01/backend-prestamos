import { Module } from '@nestjs/common';
import { CobradoresController } from './cobradores.controller';

@Module({
  controllers: [CobradoresController]
})
export class CobradoresModule {}
