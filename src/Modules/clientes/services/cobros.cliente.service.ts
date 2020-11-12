import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import 
{ 
    DateProcessService, 
    ProcessDataService 
} 
from 'src/Classes/classes.index';
import 
{ 
    responseInterface, 
    _argsFind, 
    _argsPagination, 
    _argsUpdate, 
    _configPaginator, 
    _dataPaginator 
} 
from 'src/Response/interfaces/interfaces.index';
import {createCobroClienteDto, modifyCobroClienteDto} from '../models/dto/index.dto';
import {statusCobro} from '../models/enum/status.cobro.enum';
import {modifyCobrosCliente} from '../models/interfaces/interfaces.index';
import {Cobros} from '../models/schemas/cobros.schema';


@Injectable()
export class CobrosClienteService 
{
    private _Response:responseInterface;

    constructor
    (
        @InjectModel(Cobros.name) private _cobrosModel:Model<Cobros>,
        private _processData:ProcessDataService,
        private _dateProcessService:DateProcessService
    ){}

    async createNewPayment(cobro:createCobroClienteDto):Promise<responseInterface>
    {
        const data = new this._cobrosModel(cobro);
        await this._processData._saveDB(data).then(r => 
        {
            this._Response = r;
        }, 
        err => 
        {
            this._Response = err;
        }); 
        return this._Response;
    }

    async getAllPaymentDo(cliente:string):Promise<responseInterface>
    {
        const args: _argsFind = 
        {
            findObject: { cliene_id:cliente },
            populate: null
        }
        await this._processData._findOneDB(this._cobrosModel, args).then(r => 
        {
           this._Response = r;
        }, err => 
        {
            this._Response = err;
        });
        return this._Response;
    }

    async getOnePaymentDo(pago:string):Promise<responseInterface>
    {
        const args: _argsFind = 
        {
            findObject: { _id:pago },
            populate: null
        }
        await this._processData._findOneDB(this._cobrosModel, args).then(r => 
        {
           this._Response = r;
        }, err => 
        {
            this._Response = err;
        });
        return this._Response;
    }

    async modifyOldPayment(@Body() body:modifyCobroClienteDto):Promise<responseInterface>
    {
        // se crea un objeto con los nuevos valores
        const data: modifyCobrosCliente = 
        {
            monto: body.monto,
            status: statusCobro.MODIFICADO,
            observacion: body.observacion,
            updatedAt: this._dateProcessService.setDate()
        }
        // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
        const args: _argsUpdate = 
        {
            findObject: {
                _id: body._id,
            },
            set: {
                $set: data
            }
        }

        await this._processData._updateDB(this._cobrosModel, args).then(r =>
        {
            this._Response = r;

        }, err =>
        {
            this._Response = err;
            this._Response.data = null;
        });
        return this._Response;
    }

}
