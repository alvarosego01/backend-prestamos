import { Module } from '@nestjs/common';
import { _TRAZAESTADISTICASYSTEMACHEMA, _TRAZANEGOCIOSYSTEMACHEMA } from './schemas/index.schema';

@Module({
    imports:
    [
        _TRAZANEGOCIOSYSTEMACHEMA,
        _TRAZAESTADISTICASYSTEMACHEMA
    ],
    exports:
    [
        _TRAZANEGOCIOSYSTEMACHEMA,
        _TRAZAESTADISTICASYSTEMACHEMA
    ]
})
export class Estadisticas_ModelsModule {}
