import { Module } from '@nestjs/common';
import { EnrutadorController, RutasController, TablaDiariaController } from './controllers/controller.index';
import { RutaModule } from './models/rutaModels.module';
import { EnrutadorService, RutaService, TablaDiariaService } from './services/services.index';
import { AuthModule } from '../auth/auth.module';
import { _NEGOCIOSCHEMA } from '../clientes/models/schemas/schemas.index';

@Module({
  imports:[RutaModule, AuthModule, _NEGOCIOSCHEMA],
  controllers: [EnrutadorController, RutasController, TablaDiariaController],
  providers: [EnrutadorService, RutaService, TablaDiariaService]
})
export class EnrutadorModule {}
