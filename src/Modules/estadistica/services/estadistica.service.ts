import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron } from '@nestjs/schedule'
import { Model } from 'mongoose'
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index'
import 
{ 
	responseInterface, 
	_argsFind, 
	_argsPagination, 
	_argsUpdate, 
	_configPaginator, 
	_dataPaginator 
} from 'src/Response/interfaces/interfaces.index'
import { Ruta } from 'src/Modules/enrutador/models/schemas/ruta.schema' 
import { Negocio } from 'src/Modules/clientes/models/schemas/negocio.schema'
import { Cobros } from 'src/Modules/clientes/models/schemas/cobros.schema'
import { Cliente } from 'src/Modules/clientes/models/schemas/cliente.schema'
import { Users } from 'src/Modules/users/models/schemas/userSchema' 

/* 
	Estas estadisticas hablaran de: 
	*total de dinero prestado por ruta
	*total de dinero recogido por ruta
	*total de dinero recogido
	*numero de rutas, 
	*numero de negocios registrados,
	*numero de necogios por cliente 
	*numero total de cobradores
	*numero de cobradores por ruta
	*numero de cobradores regisrados
	*negocios de mayor prestamo
	*negocios de menor prestamo
	*total de recavado el dia anterior
*/

/*
 	*primero debemos obtener todos los schemas de cada ambito al cual le aplicaremos las estadisticas
 	*será una operación bastante pesada solo si se toma por dia y dichos calculos se guardan en un modelo
 	*para esto necesitaria el modelo de cliente, negocios, rutas, usuarios
 	*todas las peticiones se harán tomando en cuenta el ID del enrutador
 */

@Injectable()
export class EstadisticaService 
{
	private readonly logger:Logger //log del CRON
	private readonly roles:number //cantidad de pasadas de revisión según la cantidad de roles
	private _Response:responseInterface //variable de respuesta de backend
	private AuxUser:Array<Users> //auxiliar de modelo usuarios
	private _SystemResponse:responseInterface //interfaz de respuesta para sistema
	private ClusterCliente:		Array<any> 	//array de clientes 
	private ClusterNegocios:	Array<Negocio> 	//array de negocios
	private ClusterRutas:		Array<any> 	//array de rutas
	private ClusterCobradores:	Array<any> 	//array de cobradores
	private ClusterEnrutadores:	Array<any> 	//array de enrutdores
	private ClusterUsers:		Array<any> 	//array de usuarios
	private ClusterCobros:		Array<any>  //array de cobros

	constructor
	(
        private readonly _processData:ProcessDataService,
        private readonly _dateProcessService:DateProcessService,
        @InjectModel(Ruta.name) private readonly _rutaModel:Model<Ruta>,
        @InjectModel(Negocio.name) private readonly _negocioModel:Model<Negocio>,
        @InjectModel(Cliente.name) private readonly _clienteModel:Model<Cliente>,
		@InjectModel(Users.name) private readonly _usuariosModel:Model<Users>, 
		@InjectModel(Cobros.name) private readonly _cobrosModel:Model<Cobros>
    )
	{
		this.logger = new Logger("Estadisticas") 
		this.logger.setContext("Sistema de Estadisticas")
		this.roles = 2;//seteo la cantidad de roles que limpiaré dentro del bucle de depurado
	}

	//00 30 4 */1 * *
	@Cron('*/5 * * * * *',
    {
        name: "Manejo de Estadísticas" 
    })
    private async handleCron()
    {
		console.clear()
		this.logger.debug('Protocolo de estadisticas:')
		this.logger.debug(' 1)Inicilizando variables cluster...')
		this.ClusterInitialization()//aqui inicializo los arrays
		this.logger.debug(' 2)Obteniendo los datos de los modelos...')
		await this.getAllUserBySystem()  //me jalo a todos los usuarios registrados
		await this.purifyRolesInCluster() //purifico los cluster con la data del mdoelo users
		await this.getAllRouteBySystem() //me jalo a todos los datos de rutas
		await this.getAllBussinesBySystem() //me jalo toda la data respectiva de necogios
		await this.getAllPaymentBySystem() //me jalo todos los cobros dentro del sistema
		this.logger.debug(' 3)Limpiando y contabilizando datos de los modelos requeridos...')
		this.logger.debug(` *Cantidad total de Users: ${this.ClusterUsers.length}`)
		this.logger.debug(` *Cantidad total de Rutas: ${this.ClusterRutas.length}`)
		this.logger.debug(` *Cantidad total de Cobros: ${this.ClusterCobros.length}`)
		this.logger.debug(` *Cantidad total de Clintes: ${this.ClusterCliente.length}`)
		this.logger.debug(` *Cantidad total de Negocios: ${this.ClusterNegocios.length}`)
		this.logger.debug(` *Cantidad total de Cobradores: ${this.ClusterCobradores.length}`)
		this.logger.debug(` *Cantidad total de Enrutadores: ${this.ClusterEnrutadores.length}`)
		this.logger.debug(' 4)Limpiando y finalizando clusters...')
		await this.ClusterWipe()//llamo a la funcion para finalizar los arrays
    }

	public async getTraceOfRoutesByEnrutator(id:string):Promise<responseInterface>
	{//función que retorna la traza de cantidad de rutas por dias, puede usar el front para aplicar filtros por fecha y otros
		
		this._Response.status = 200;
		this._Response.message = "Servicio incompleto por el momento";
		return this._Response
	}

	private ClusterInitialization()
	{//funcion que inicializa los cluster para poder almacenar datos
		this.ClusterCliente 	= new Array<Cliente>() 	//array de clientes 
		this.ClusterNegocios 	= new Array<Negocio>() 	//array de negocios
		this.ClusterRutas 		= new Array<Ruta>() 	//array de rutas
		this.ClusterCobradores 	= new Array<any>() 		//array de cobradores
		this.ClusterEnrutadores = new Array<any>() 		//array de enrutdores
		this.ClusterUsers 		= new Array<any>() 		//array de usuarios
	    this.ClusterCobros		= new Array<Cobros>()  	//array de cobros
	}

	private ClusterWipe()
	{//funcion que limpia los arrays al finalizar el procedimiento
        this.ClusterCliente 	= null//array de clientes 
		this.ClusterNegocios 	= null//array de negocios
		this.ClusterRutas 		= null//array de rutas
		this.ClusterCobradores 	= null//array de cobradores
		this.ClusterEnrutadores = null//array de enrutdores
		this.ClusterUsers 		= null//array de usuarios
		this.ClusterCobros		= null//array de cobros
	}

	public async countCollectorByEnrutator(id:string):Promise<responseInterface>
	{//funcion que le cuenta al momento cuantos cobradores tiene a dispodicion el enrutador
		let countCollector:number = 0;

		await this.ClusterCobradores.forEach((collector, index)=>
		{
			
		})

		return this._Response;
	}

	public async countBussinesByEnrutator(id:string):Promise<responseInterface>
	{//función que le cuenta al momento cuantos negocios tiene a su disposición el enrutador
		let countBussines:number = 0;

		await this.ClusterNegocios.forEach((bussines, index)=>
		{
			
		})

		return this._Response;
	}

	private purifyRolesInCluster()
	{//función que extrae los elementos del cluster de ususrio según el tipo
		for(let j:number = 0; j < this.roles; j++)
		{
			for( let i:number = 0; i<this.ClusterUsers.length; i++)
			{
				let role:any = this.ClusterUsers[i].rol;

				(role.rol === 'COLLECTOR_ROLE')? this.ClusterCobradores.push(this.ClusterUsers.splice(i,1)) : false;

				(role.rol === 'ENRUTATOR_ROLE')? this.ClusterEnrutadores.push(this.ClusterUsers.splice(i,1)) : false;

				(role.rol === 'ADMINOR_ROLE')? true : false;//roles pendiente por funcionalidades futuras

				(role.rol === 'DEFAULT_ROLE')? true : false;//roles pendiente por funcionalidades futuras
			}
		}
	}

	private async getAllPaymentBySystem()
	{//funcio que me retorna todas los cobros registrados en el sistema
		this.ClusterCobros = await (await this.getDataBySystem(this._cobrosModel)).data
	}

	private async getAllRouteBySystem()
	{//funcio que me retorna todas las rutas registrados en el sistema
		this.ClusterRutas = await (await this.getDataBySystem(this._rutaModel)).data
	}

	private async getAllUserBySystem()
    {//funcion dedicada a obtener todas las rutas registrados en el sistema
        this.ClusterUsers = await (await this.getDataBySystem(this._usuariosModel,{ path:'rol', model:'Roles', select:'rol' })).data
    }

	private async getAllBussinesBySystem()
	{//funcion dedicada a obtener toos los datos de negocios registrados en el sistema
		this.ClusterNegocios = await (await this.getDataBySystem(this._negocioModel)).data
	}

	private async getAllClientsBySystem()
	{//funcion de dedicada a obtner los datos de clientes registrados en el sistema
		this.ClusterCliente = await (await this.getDataBySystem(this._clienteModel)).data
	}

	private async getDataBySystem(schema:Model<any>, populate:any = null, findObject:any =null):Promise<responseInterface>
	{//funcion interfaz que me permite traerme todo las datas dependiendo del modelo parametrizado
		const args: _argsFind = 
        {
            findObject: findObject,
            populate: populate    
        }

        await this._processData._findAllDB(schema, args).then(r => 
        {
            this._SystemResponse = r

        }, err => 
        {
            this.logger.debug(`Error: ${err}`)
        });

		return this._SystemResponse
	}

	
}
