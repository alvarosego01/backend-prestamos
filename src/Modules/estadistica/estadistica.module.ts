import { Module } from '@nestjs/common';
import {EstadisticasController} from './controllers/estadisticas.controller';
import {EstadisticaService} from './services/index.services';
import { AuthModule } from '../auth/auth.module';
import { _CLIENTESCHEMA, _NEGOCIOSCHEMA, _COBROSCHEMA } from '../clientes/models/schemas/schemas.index';
import { _USERSCHEMA } from '../users/models/schemas.index';
import { RutaModule } from '../enrutador/models/rutaModels.module';

@Module({
    controllers:
    [
        EstadisticasController,
    ],
    providers:
    [
    	EstadisticaService,
    ],
    imports:
    [
    	AuthModule, 
    	_NEGOCIOSCHEMA, 
    	_USERSCHEMA, 
    	_CLIENTESCHEMA,
        _COBROSCHEMA, 
        RutaModule
    ]
})
export class EstadisticaModule {}
