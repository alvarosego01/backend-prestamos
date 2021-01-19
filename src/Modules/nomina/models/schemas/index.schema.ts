import { MongooseModule } from "@nestjs/mongoose";
import 
{
	Banco,
	Nomina, 
	NominaSchema
} from './nomina.schema'

import 
{
	CajaChica,
	CajaChicaSchema,
	GastosOperacion,
	GastosOperacionSchema
} from './cajachica.schema'

export 
{
	CajaChica,
	CajaChicaSchema,
	GastosOperacion
} from './cajachica.schema'

export 
{
	Banco,
	Nomina, 
	NominaSchema
} from './nomina.schema'


export const _NOMINASCHEMA = MongooseModule.forFeature([
	{
		name: Nomina.name,
		schema: NominaSchema
	}
]);


export const _CAJACHICASCHEMA = MongooseModule.forFeature([
	{
		name: CajaChica.name,
		schema: CajaChicaSchema
	}
]);

export const _GASTOSOPSCHEMA = MongooseModule.forFeature([
	{
		name: GastosOperacion.name,
		schema: GastosOperacionSchema
	}
]);