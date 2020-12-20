import { Module } from '@nestjs/common';

import
{
	PermisoService

} from './index.service';

@Module({
	imports:[],
	exports:[PermisoService],
	providers:[PermisoService]
})
export class ServicesModule {}
