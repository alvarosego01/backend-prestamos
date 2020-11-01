import { Module } from '@nestjs/common';
import { EnrutadorController, RutasController } from './controllers/controller.index';
import { RutaModule } from './models/rutaModels.module';
import { EnrutadorService, RutaService } from './services/services.index';

@Module({
  imports:[RutaModule],
  controllers: [EnrutadorController, RutasController],
  providers: [EnrutadorService, RutaService]
})
export class EnrutadorModule {}
