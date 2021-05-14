import { Module } from '@nestjs/common';
import { _TRAZAESTADISTICASYSTEMACHEMA, _TRAZANEGOCIOSYSTEMACHEMA, _TRAZAPAGOSYSTEMACHEMA } from './schemas/index.schema';

@Module({
    imports:
    [
        _TRAZANEGOCIOSYSTEMACHEMA,
        _TRAZAESTADISTICASYSTEMACHEMA,
        _TRAZAPAGOSYSTEMACHEMA
    ],
    exports:
    [
        _TRAZANEGOCIOSYSTEMACHEMA,
        _TRAZAESTADISTICASYSTEMACHEMA,
        _TRAZAPAGOSYSTEMACHEMA
    ]
})
export class Estadisticas_ModelsModule {}
