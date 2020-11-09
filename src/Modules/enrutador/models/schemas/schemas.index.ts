import { MongooseModule } from "@nestjs/mongoose";
import { Ruta, RutaSchema } from "./ruta.schema";



export const _RUTASCHEMA = MongooseModule.forFeature([
  {
    name: Ruta.name,
    schema: RutaSchema,
  },
]);