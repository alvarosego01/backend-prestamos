import { MongooseModule } from "@nestjs/mongoose"; 
import { TrazaEstadisticaSystema, TrazaEstadisticaSystemaSchema } from './traza.estadistica.schema'
import { TrazaNegocioSystema, TrazaNegocioSystemaSchema } from './negocio.estadistica.schema'

export const _TRAZAESTADISTICASYSTEMACHEMA = MongooseModule.forFeature([
  { 
    name: TrazaEstadisticaSystema.name,  
    schema: TrazaEstadisticaSystemaSchema,
  },
]);

export const _TRAZANEGOCIOSYSTEMACHEMA = MongooseModule.forFeature([
  { 
    name: TrazaNegocioSystema.name,  
    schema: TrazaNegocioSystemaSchema,
  },
]);