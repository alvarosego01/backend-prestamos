import { Module } from '@nestjs/common';

import
{
	PermisoController
} from './controller/index.controller'

import
{
	PermisoSchemaModule
} from './models/schemas/permisos.module'

import
{
	ServicesModule
} from './services/services.module'

@Module({
	controllers:[PermisoController],
	imports:[PermisoSchemaModule, ServicesModule],
	providers:[ServicesModule]
})
export class PermisosModule {}
