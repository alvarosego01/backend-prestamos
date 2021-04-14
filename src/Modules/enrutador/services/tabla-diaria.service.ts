import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron } from '@nestjs/schedule'
import { Model } from 'mongoose'
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index'
import { _argsPagination, responseInterface, _argsFind } from 'src/Response/interfaces/interfaces.index'
import { Ruta } from '../models/schemas/ruta.schema'
import { Negocio } from 'src/Modules/clientes/models/schemas/negocio.schema'
import { TablaDiaria } from '../models/schemas/tablaDiaria.schema'

@Injectable()
export class TablaDiariaService 
{
    private readonly logger:Logger = new Logger("Centinala diario") //log del CRON
    private _Response:responseInterface //interfaz de respuesta
    private clusterRoutes:Array<any> //variable para obtener todas las rutas almacenadas en coleccion
    private backDay:String //variable con la expresión de fecha, parámetro de busqueda
    private iteratorSafe:number //Contador de items guardados

    constructor
    (
        private readonly _processData:ProcessDataService,
        private readonly _dateProcessService:DateProcessService,
        @InjectModel(Ruta.name) private readonly _rutaModel:Model<Ruta>,
        @InjectModel(TablaDiaria.name) private _tablaDiariaModel:Model<TablaDiaria>
    )
    {
        this.logger.setContext("Sistema de Tabla Diaria")
        this.iteratorSafe = 0
        this.backDay = this._dateProcessService.getNextPointInTime(-3) //seteo la cantidad de dias hacia atras, en este caso 1dia
    }
    
    //reloj de sistema para las tablas diarias
    //("00 30 3 */1 * *")
    
    @Cron('*/5 * * * * *',
    {
        name: "Tabla Diaria" 
    })
    private async handleCron()
    {
        //esta primera fase será solo para crear los items recien añadidos a las rutas y establecer su loop de cobro
        console.clear();
        this.logger.debug("Protocolo para tablas diarias de cobro:")
        this.logger.debug(`Dia parámetro para busqueda de datos: ${this.backDay}`)
        await this.getAllRoutes()
        await this.searchChangeInRouteSchema()
        await this.searchNewBussinesInStackRoutes()

    }

    //funcion que se ocupará de revisar si existe fecha de modificación y si tienen 1 dia de haber sido modificadas
    private async searchChangeInRouteSchema()
    {
        this.iteratorSafe =0 //seteo el contador de items guardados a 0 por cada vez que se reinicie la operacion
        this.logger.debug("2) Buscando modificaciones hechas en menos de un dia...")
        //empiezo la depuración de aquellas rutas que tengan menos de un dia de modificadas
        if(this._Response.data.length ===1)
        {
            this.logger.debug('   Procedimiento con 1 item en la pila...');
            (this._Response.data[0].updatedAt[1] == this.backDay)? this.clusterRoutes = this._Response.data : false

        }else
        {
            this.logger.debug("   Procedimiento con varios items en la pila...")
            this.logger.debug(`   Cantidad de items totales: ${this._Response.data.length} items`)
            this.clusterRoutes = this._Response.data.filter( cluster =>  cluster.updatedAt[1] == this.backDay ) 
            this.logger.debug(`   Cantidad de items depurados: ${this.clusterRoutes.length} items`)
        }
    }

    //funcion que se ocupará de buscar los negocios nuevos en la pila de negocios en cada ruta en la variable de Cluster
    private async searchNewBussinesInStackRoutes()
    {
        this.logger.debug('3) Iniciando procedimiento con el stack de negocios...')
        let countBussines:number = 0 //contador de negocios
        if(this.clusterRoutes.length === 1)
        {
            for(let j:number = 0; j < this.clusterRoutes[0].negocios_id.length; j++)
            {
                //al comprobar las fechas sean las indicadas, paso la información a la etapa final de busqueda
                (this.clusterRoutes[0].negocios_id[j].createdAt[1] == this.backDay)? 
                await this.prepareEachBussines(this.clusterRoutes[0].negocios_id[j], this.clusterRoutes[0]) : false
                countBussines += 1
            }
            
        }else 
        {
            for(let i:number = 0; i < this.clusterRoutes.length; i++)
            {
                for(let j:number = 0; j < this.clusterRoutes[i].negocios_id.length; j++)
                {
                    //al comprobar las fechas sean las indicadas, paso la información a la etapa final de busqueda
                    (this.clusterRoutes[i].negocios_id[j].createdAt[1] == this.backDay)? 
                    await this.prepareEachBussines(this.clusterRoutes[i].negocios_id[j], this.clusterRoutes[i]) : false
                    countBussines += 1
                }
            }
        }
        this.logger.debug(`   Items guardados: ${this.iteratorSafe}`)
        this.logger.debug(`   Cantidad de negocios contabilizados y tratados: ${countBussines}`)
    }

    //funcion que opera dentro de cada item del stack de negocio  y obteniendo los datos para tabla diaria
    private async prepareEachBussines(bussines:Negocio, route:Ruta)
    {
        let auxDiaria:TablaDiaria = new this._tablaDiariaModel()
        let concurrencia:number = bussines.concurrencia

        auxDiaria.enrutador_id  = route.enrutador_id
        auxDiaria.negocio_id    = bussines._id
        auxDiaria.ruta_id       = route._id
        auxDiaria.concurrencia  = bussines.concurrencia
        auxDiaria.pendiente     = bussines.pendiente
        auxDiaria.prev_pago     = null
        auxDiaria.next_pago     = this._dateProcessService.getNextPointDate(concurrencia, bussines.createdAt[1])
        //await this.saveOneBussines(auxDiaria); //guardo automaticamente los nuevos items en base de datos
    }

    //funcion dedicada al guardado de las nuevas entradas
    private async saveOneBussines(data:TablaDiaria)
    {
        await this._processData._saveDB(data).then( async (r) =>
        {
            this.iteratorSafe += 1
            this._Response = r;
        },
        err =>
        {
            this._Response = err;
        });
        return this._Response;
    }


    private async getAllRoutes()
    {//funcion dedicada a obtener todas las rutas
        this.logger.debug("1) Obteniendo todos los items de la coleccion RUTAS...")
        const args: _argsFind = 
        {
            findObject: {},
            populate: 
            [{
                path: 'negocios_id',
                model: 'Negocio', // <- si es un array de ids se debe especificar el model
            }]    
        }

        await this._processData._findAllDB(this._rutaModel, args).then(r => 
        {
            this._Response = r;

        }, err => 
        {
            this._Response = err;
        });
        return this._Response.data;
    }
}
