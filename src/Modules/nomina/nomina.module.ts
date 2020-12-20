import { Module } from '@nestjs/common';

import 
{
	NominaController,
	PagoController
} from './controllers/index.controller';

import
{
	NominaService

} from './services/index.services';

import 
{
	ModelsModule

} from './models/schemas/models.module';

@Module({
	imports:
	[
		ModelsModule
	],
	controllers:
	[
		NominaController,
		PagoController
	],
	providers:
	[
		NominaService
	]
})
export class NominaModule {}
