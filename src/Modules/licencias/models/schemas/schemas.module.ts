import { Global, Module } from '@nestjs/common';
import { _LICENCIASCHEMA, _LICENCIASOLICITUDSCHEMA } from './index.schema';

@Global()
@Module({
   imports:
   [
       _LICENCIASCHEMA,
       _LICENCIASOLICITUDSCHEMA
   ],
   providers:[],
   exports:
   [
       _LICENCIASCHEMA,
       _LICENCIASOLICITUDSCHEMA
   ]
})
export class LicenciaSchemaModule {}
