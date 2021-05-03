import { Module } from '@nestjs/common';
import { EnrutadorController, RutasController, TablaDiariaController, EstadisticasController } from './controllers/controller.index';
import { RutaModule } from './models/rutaModels.module';
import { EnrutadorService, EstadisticaService, RutaService, TablaDiariaService } from './services/services.index';
import { AuthModule } from '../auth/auth.module';
import { _CLIENTESCHEMA, _NEGOCIOSCHEMA } from '../clientes/models/schemas/schemas.index';
import { _USERSCHEMA } from '../users/models/schemas.index';

@Module({
  imports:[RutaModule, AuthModule, _NEGOCIOSCHEMA, _USERSCHEMA, _CLIENTESCHEMA],
  controllers: [EnrutadorController, RutasController, TablaDiariaController, EstadisticasController],
  providers: [EnrutadorService, RutaService, TablaDiariaService, EstadisticaService]
})
export class EnrutadorModule {}
