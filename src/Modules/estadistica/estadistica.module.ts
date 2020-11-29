import { Module } from '@nestjs/common';
import {EstadisticaController} from './controllers/estadistica.controller';

@Module({
    controllers:
    [
        EstadisticaController
    ]
})
export class EstadisticaModule {}
