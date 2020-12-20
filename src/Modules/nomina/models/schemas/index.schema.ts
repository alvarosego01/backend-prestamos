import { MongooseModule } from "@nestjs/mongoose";
import 
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