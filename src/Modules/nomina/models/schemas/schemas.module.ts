import { Global, Module } from '@nestjs/common';
import
{
	_NOMINASCHEMA, 
	_CAJACHICASCHEMA,
	_GASTOSOPSCHEMA
} from './index.schema'; 

@Global()
@Module({
	imports: [_NOMINASCHEMA, _CAJACHICASCHEMA, _GASTOSOPSCHEMA],
	exports: [_NOMINASCHEMA, _CAJACHICASCHEMA, _GASTOSOPSCHEMA]
})
export class SchemasModule{}
