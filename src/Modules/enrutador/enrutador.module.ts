import { Module } from '@nestjs/common';
import { EnrutadorController, RutasController } from './controllers/controller.index';
import { RutaModule } from './models/rutaModels.module';
import { EnrutadorService, RutaService, TablaDiariaService } from './services/services.index';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports:[RutaModule, AuthModule],
  controllers: [EnrutadorController, RutasController],
  providers: [EnrutadorService, RutaService, TablaDiariaService]
})
export class EnrutadorModule {}
