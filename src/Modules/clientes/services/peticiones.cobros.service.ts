import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import 
{
    DateProcessService, 
    ProcessDataService
} 
from 'src/Classes/classes.index';
import {responseInterface, _argsFind, _argsPagination, _argsUpdate, _configPaginator, _dataPaginator} from 'src/Response/interfaces/interfaces.index';
import {statusCobro} from '../models/enum/index.enum';
import {modifyCobrosCliente} from '../models/interfaces/interfaces.index';
import {Cobros} from '../models/schemas/cobros.schema';
import {CambioCobro} from '../models/schemas/peticion.schema';

@Injectable()
export class PeticionesCobrosService 
{
    private _Response:responseInterface;

    constructor
    (
        @InjectModel(CambioCobro.name) private _cambioCobroModel:Model<CambioCobro>,
        @InjectModel(Cobros.name) private _cobrosModel:Model<Cobros>,
        private _processData:ProcessDataService,
        private _dateProcessService:DateProcessService
    ){}

    async getAllCobrosByEnrutador(id:string):Promise<responseInterface>
    {
        const parameters: _dataPaginator = 
        { 
            page: 1 || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 },
        }

        const args: _argsPagination = 
        {
            findObject: { enrutador_id: id },
            options: parameters
        }

        await this._processData._findDB(this._cambioCobroModel, args).then(r => 
        {
           this._Response = r;
        }, err => 
        {
            this._Response = err;
        });
        
        return this._Response;
    }

    async getOneCobrosById(id:string):Promise<responseInterface>
    {
        const args: _argsFind = 
        {
            findObject: { _id:id },
            populate:
            [
                {
                    path: 'cobrador_id',
                    select: '-password'
                },
                {
                    path: 'cliente_id'
                },
                {
                    path: 'cobro_id'
                }
            ]
        }
        await this._processData._findOneDB(this._cambioCobroModel, args).then(r => 
        {
           this._Response = r;
        }, err => 
        {
            this._Response = err;
        });
        return this._Response;
    }

    async confirmarOneCobroById(id:string):Promise<responseInterface>
    {
        const args: _argsFind = { findObject: { _id:id }}
        let statment:CambioCobro = null;

        await this._processData._findOneDB(this._cambioCobroModel, args).then(r => 
        {
            this._Response = r;
            this.findOneCobro(r.data);

        }, err => 
        {
            this._Response = err;
        });
        return this._Response;
    }

    async denegarOneCobroById(id:string):Promise<responseInterface>
    {
        return await this.refreshOnePetición(id, statusCobro.DENEGADO);
    }

    private async findOneCobro(data:CambioCobro):Promise<responseInterface>
    {
        // se crea un objeto con los nuevos valores
        const cobro: modifyCobrosCliente = 
        {
            monto: data.monto,
            observacion: data.observacion,
            status: statusCobro.MODIFICADO,
            updatedAt: this._dateProcessService.setDate()
        }
        // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
        const args: _argsUpdate = {
            findObject: {
                _id: data.cobro_id,
            },
            set: {
                $set: cobro
            }
        }

        await this._processData._updateDB(this._cobrosModel, args).then(r => {
            this._Response = r;
            this.refreshOnePetición(data._id, statusCobro.APROBADO);

        }, err => {

            this._Response = err;
        });

        return this._Response;
    }

    private async refreshOnePetición(id:string, status:string):Promise<responseInterface>
    {
        // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
        const args: _argsUpdate = {
            findObject: {
                _id: id,
            },
            set: {
                $set:
                { 
                    'status': status,
                    'updatedAt': this._dateProcessService.setDate()
                }
            }
        }

        await this._processData._updateDB(this._cambioCobroModel, args).then(r => 
        {
            this._Response = r;
        }, err => 
        {
            this._Response = err;
        });

        return this._Response;
    }
}
