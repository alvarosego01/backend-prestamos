import { MongooseModule } from "@nestjs/mongoose";
import { Licencia, LicenciaSchema } from "./licencia.schema";
import { LicenciaSolicitud, LicenciaSolicitudSchema } from "./solicitudes.schema";

export { Licencia, LicenciaSchema } from "./licencia.schema";
export { LicenciaSolicitud, LicenciaSolicitudSchema } from "./solicitudes.schema";

export const _LICENCIASCHEMA = MongooseModule.forFeature([
  {
    name: Licencia.name,
    schema: LicenciaSchema,
  },
]);

export const _LICENCIASOLICITUDSCHEMA = MongooseModule.forFeature([
    {
      name: LicenciaSolicitud.name,
      schema: LicenciaSolicitudSchema,
    },
  ]);