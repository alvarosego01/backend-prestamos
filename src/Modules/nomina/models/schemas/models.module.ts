import { Global, Module } from '@nestjs/common';
import
{
	_NOMINASCHEMA
} from './index.schema'; 

@Global()
@Module({
	imports: [_NOMINASCHEMA],
	exports: [_NOMINASCHEMA]
})
export class ModelsModule{}
