import { Module } from '@nestjs/common';
import {EstadisticasController} from './controllers/estadisticas.controller';
import 
{
    EstadisticaService,
    Negocio_EstadisticaService
} from './services/index.services';
import
{
    _TRAZAESTADISTICASYSTEMACHEMA
}from './models/schemas/index.schema'
import { AuthModule } from '../auth/auth.module';
import { _CLIENTESCHEMA, _NEGOCIOSCHEMA, _COBROSCHEMA } from '../clientes/models/schemas/schemas.index';
import { _USERSCHEMA } from '../users/models/schemas.index';
import { RutaModule } from '../enrutador/models/rutaModels.module';
import { SchemasModule } from '../nomina/models/schemas/schemas.module'
import { ClientesModule } from '../clientes/clientes.module';

@Module({
    controllers:
    [
        EstadisticasController,
    ],
    providers:
    [
    	EstadisticaService,
        Negocio_EstadisticaService
    ],
    imports:
    [
    	AuthModule, 
    	_NEGOCIOSCHEMA, 
    	_USERSCHEMA, 
    	_CLIENTESCHEMA,
        _COBROSCHEMA, 
        RutaModule,
        SchemasModule,
        _TRAZAESTADISTICASYSTEMACHEMA
    ]
})
export class EstadisticaModule {}
