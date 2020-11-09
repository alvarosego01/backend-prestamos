import { Global, Module } from '@nestjs/common';
import { _RUTASCHEMA } from './schemas/schemas.index';

@Global()
@Module({
    imports:[_RUTASCHEMA],
    exports:[_RUTASCHEMA]
})
export class RutaModule {}
