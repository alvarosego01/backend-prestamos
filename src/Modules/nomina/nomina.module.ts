import { Module } from '@nestjs/common';

import 
{
	NominaController,
	PagoController,
	CajachicaController,
	GastosoperacionesController
} from './controllers/index.controller';

import
{
	NominaService,
	CajachicaService,
	GastosoperacionesService

} from './services/index.services';

import 
{
	SchemasModule

} from './models/schemas/schemas.module';

@Module({
	imports:
	[
		SchemasModule
	],
	controllers:
	[
		NominaController,
		PagoController,
		CajachicaController,
		GastosoperacionesController
	],
	providers:
	[
		NominaService,
		CajachicaService,
		GastosoperacionesService
	]
})
export class NominaModule {}
