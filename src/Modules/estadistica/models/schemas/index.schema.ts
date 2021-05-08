import { MongooseModule } from "@nestjs/mongoose"; 
import { TrazaEstadisticaSystema, TrazaEstadisticaSystemaSchema } from './traza.estadistica.schema'

export const _TRAZAESTADISTICASYSTEMACHEMA = MongooseModule.forFeature([
  { 
    name: TrazaEstadisticaSystema.name,  
    schema: TrazaEstadisticaSystemaSchema,
  },
]);