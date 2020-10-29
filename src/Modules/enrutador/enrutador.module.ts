import { Module } from '@nestjs/common';
import { EnrutadorController, RutasController } from './controllers/controller.index';
import { EnrutadorService } from './services/services.index';

@Module({
  imports:[],
  controllers: [EnrutadorController, RutasController],
  providers: [EnrutadorService]
})
export class EnrutadorModule {}
