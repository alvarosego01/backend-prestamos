import { Injectable, Logger } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service'
import 
{ 
	responseInterface, 
	_argsFind, 
	_argsPagination, 
	_argsUpdate, 
	_configPaginator, 
	_dataPaginator 
} from 'src/Response/interfaces/interfaces.index'
import { traceBussines } from '../models/interfaces/index.interface';

@Injectable()
export class Negocio_EstadisticaService 
{

	private traceBussines:traceBussines //objeto que contendrá los datos estadisticos de negocio
	private _Response:responseInterface //interfaz de respuesta a usuario
	private _SystemResponse:responseInterface //interfaz de respuesta a sistema
	private logger:Logger

	//necesito negocios, enrutadores, clientes, cobradores
	constructor
	(
		private readonly _statService:EstadisticaService
	)
	{
		
		this.logger = new Logger("Estadisticas de negocio") 
		this.logger.setContext("Estadisticas de negocio")
	}
	//--------funciones públicas de usuario-------------
	//--------funciones privadas de sistema-------------
	//--------funciones públicas de sistema-------------
	public async generateTraceStatsBussines(debug:boolean =false)
	{//funcion que genera la traza de ngocios para estudios de control de datos

		if(debug)
		{
			this.logger.debug(' ESTADISTICAS DE NEGOCIOS EN MODO DEBUG, NO GUARDA DATOS EN BASE...')
			console.log(await this._statService.getRoutesToOtherService())
		}else
		{

		}
	}
	
}
