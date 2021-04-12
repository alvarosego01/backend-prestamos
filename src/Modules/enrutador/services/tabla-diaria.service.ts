import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron } from '@nestjs/schedule'
import { Model } from 'mongoose'
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index'
import { _argsPagination, responseInterface, _argsFind } from 'src/Response/interfaces/interfaces.index'
import { Ruta } from '../models/schemas/ruta.schema'

@Injectable()
export class TablaDiariaService 
{
    private readonly logger:Logger = new Logger("Centinala diario") //log del CRON
    private _Response:responseInterface //interfaz de respuesta
    private clusterRoutes:Array<Ruta> //variable para obtener todas las rutas almacenadas en coleccion
    private backDay:String //configuro la cantidad de dias hacia atras

    constructor
    (
        private readonly _processData:ProcessDataService,
        private readonly _dateProcessService:DateProcessService,
        @InjectModel(Ruta.name) private readonly _rutaModel:Model<Ruta>
    )
    {
        this.logger.setContext("Sistema de Tabla Diaria")
        this.backDay = this._dateProcessService.getNextPointInTime(-1) //seteo la cantidad de dias hacia atras, en este caso 1dia
    }
    
    //reloj de sistema para las tablas diarias
    //("02 30 2 */1 * *")
    
    @Cron('*/5 * * * * *',
    {
        name: "Tabla Diaria" 
    })
    private async handleCron()
    {
        //esta primera fase será solo para crear los items recien añadidos a las rutas y establecer su loop de cobro
        console.clear();
        this.logger.debug("Protocolo para tablas diarias de cobro:")
        await this.getAllRoutes()
        await this.searchChangeInRouteSchema()

    }

    //funcion que se ocupará de revisar si existe fecha de modificación y si tienen 1 dia de haber sido modificadas
    private async searchChangeInRouteSchema()
    {
        this.logger.debug("2) Buscando modificaciones hechas en menos de un dia...")
        //auxiliar para jalarme todos los items de las rutas y empezar a depurar con respecto a sus fechas
        let auxClusterRoutes:Array<Ruta> = Array<Ruta>() 
        auxClusterRoutes = this._Response.data
        //empiezo la depuración de aquellas rutas que tengan menos de un dia de modificadas
        if(auxClusterRoutes.length ===1)
        {
            this.logger.debug("Procedimiento con 1 item en la pila...")

        }else
        {
            this.logger.debug("   Procedimiento con varios items en la pila...")
            this.clusterRoutes = auxClusterRoutes.filter( cluster =>  cluster.updatedAt[1] == this.backDay ) 
            this.logger.debug(`   Cantidad de items depurados: ${this.clusterRoutes.length} items`)
        }
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
