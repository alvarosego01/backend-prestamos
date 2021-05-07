import { MongooseModule } from "@nestjs/mongoose"; 
import { TrazaRutas, TrazaRutasSchema } from './traza_rutas.estadistica.schema'

export const _TRAZARUTASCHEMA = MongooseModule.forFeature([
  { 
    name: TrazaRutas.name,  
    schema: TrazaRutasSchema,
  },
]);