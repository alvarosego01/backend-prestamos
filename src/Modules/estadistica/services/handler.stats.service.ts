import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EstadisticaService } from './estadistica.service';
import { Negocio_EstadisticaService } from './negocio.stadistica.service';

@Injectable()
export class HandlerStatService 
{
	private readonly debug:boolean //true paa modo de pruebas y fals para modo de produccion
	private readonly logger:Logger //log del CRON
	private static readonly timeDBG:string = '*/5 * * * * *' //tiempo para debugeo
	private static readonly timePRD:string = '00 30 4 */1 * *' //tiempo para producccion

	constructor
	(
		private readonly _statServices:EstadisticaService,
		private readonly _bussinesStatService:Negocio_EstadisticaService
	)
	{
		this.debug = true //seteo de modo de pruebas
		this.logger = new Logger("CRONHANDLER") 
		this.logger.setContext("Sistema automatizado de estadisticas")
		
	}

	
	// "5f9a8465a39bda0c1c5b971a" -> id del enrutador de pruebas 
	@Cron(HandlerStatService.timeDBG,
    {
        name: "Manejo de Estadísticas" 
    })
    private async handleCron()
    {//el valor debug lo uso para probar funciones sin tener que guardar en base...

		if (this.debug) //condicional que me permite debuguear procesos y funciones
		{
			console.clear()
			console.log('\n');
			this.logger.debug(' #MODO DEBUG, procedimientos en pruebas... \n\n')
			await this._statServices.systemStats(this.debug)
			await this._bussinesStatService.generateTraceStatsBussines(this.debug)

		} else 
		{
			await this._statServices.systemStats()//llamo a la funcion para generar estadisticas
			await this._bussinesStatService.generateTraceStatsBussines()//llamo a la funcion para generar estadisticas de negocios
		}
		
    }
}
