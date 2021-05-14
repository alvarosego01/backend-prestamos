import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
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
import { PaymentTrace } from '../models/interfaces/index.interface'
import { TrazaPagoSystema } from '../models/schemas/pagos.estadisticas.schema'


@Injectable()
export class Pagos_EstadisticaService 
{
	private readonly logger:Logger
	private _Response:responseInterface
	private _SystemResponse:responseInterface
	private ClustertraceDB:Array<TrazaPagoSystema>
	private t_Enrutator:number
	private ClusterEnrutators:Array<any> //cluster para guardar a los enrutadores
	private paymentTrace:PaymentTrace


	constructor
	(
		private readonly _statService:EstadisticaService,
		@InjectModel(TrazaPagoSystema.name) private _trazaPagoModel:Model<TrazaPagoSystema>
	)
	{
		this.logger = new Logger("Estadisticas de cobros") 
		this.logger.setContext("Estadisticas de cobros")
		this.t_Enrutator = 0
		this.paymentTrace =
		{
			enrutador_id		:"", 
			cobrador_id_low 	:"",
			cobrador_id_high	:"",  
			pcliente_id_low		:"",  
			pcliente_id_high	:"",  
			payment_low			:0, 
			payment_high		:0, 
			payment_count		:0  
		}
	}

	//--------funciones privadas de sistema-------------
	private async saveClusterTracePayment()
	{//Guardo en base de datos la traza generada de negocios por cada enrutador
		for(let i:number =0; i <this.t_Enrutator; i++)
		{
			//this._SystemResponse = await this._statService.saveDataBySystem(this.ClustertraceDB[i])
			
		}

		this.logger.debug(' 8)Finalizando histórico de prestamos/negocios, limpiando cluster...')
		this.ClustertraceDB = null
		this.ClusterEnrutators = null

	}

	//--------funciones públicas de sistema-------------
	public async generateTraceStatsPayment(dataCluster:Array<any>, t_Enrutators:number, debug:boolean =false)
	{
		this.logger.debug('  9)Generando estadisticas de cobros/negocios...')
		this.ClusterEnrutators = new Array<any>()
		this.ClustertraceDB    = new Array<TrazaPagoSystema>()
		this.ClusterEnrutators = dataCluster
		this.t_Enrutator 	   = t_Enrutators

		if(debug)
		{
			this.logger.debug(' ESTADISTICAS DE NEGOCIOS/PAGOS EN MODO DEBUG, NO GUARDA DATOS EN BASE...')
			console.log("\nCLUSTER DE ENRUTADORES en pagos:\n", this.ClusterEnrutators)
			console.log("\nCLUSTER DE TRAZA DE PAGOS/NEGOCIO:\n", this.ClustertraceDB)
			
		}else
		{
			this.logger.debug('  10)Guardando para histórico de estadisticas de pagos/negocios...')
			await this.saveClusterTracePayment() //guardo uno x uno por enrutador las trazas de pagos
		}
	}
}
