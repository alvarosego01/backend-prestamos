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
import 
{
    createCobroClienteDto, 
    modifyCobroClienteDto,
} 
from '../models/dto/index.dto';
import {createCobroCliente, createCuotaCliente} from '../models/interfaces/interfaces.index';
import {Cobros} from '../models/schemas/cobros.schema';
import {Negocio, Cuota} from '../models/schemas/negocio.schema';
import {CambioCobro} from '../models/schemas/peticion.schema';

@Injectable()
export class CobrosClienteService 
{
    private _Response:responseInterface;
    private _Cuota = {
        pagado: null,
        restante: null,
        penalizacion: null,
        cuotas_restante: null,
        resumen: null
    };
    private _Negocio:Negocio;

    constructor
    (
        @InjectModel(Cobros.name) private _cobrosModel:Model<Cobros>,
        @InjectModel(CambioCobro.name) private _cambioModel:Model<CambioCobro>,
        @InjectModel(Negocio.name) private _negocioModel:Model<Negocio>,
        @InjectModel(Cuota.name) private _cuotaModel:Model<Cuota>,
        private _processData:ProcessDataService,
        private _dateProcessService:DateProcessService
    ){}

    async createNewPayment(cobro:createCobroClienteDto):Promise<responseInterface>
    {
        const args: _argsFind = 
        {
            findObject: { _id:cobro.negocio_id },
            populate: null
        }
        await this._processData._findOneDB(this._negocioModel, args).then(r => 
        {
            this._Response = r;

        }, err => 
        {
            this._Response = err;
        });

        return await this.treatmentCuotas(this._Response, cobro); 
    }

    async getAllPaymentDo(cliente:string):Promise<responseInterface>
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
            findObject: { cliente_id: cliente },
            options: parameters
        }

        await this._processData._findDB(this._cobrosModel, args).then(r => 
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

    async modifyOldPayment(body:modifyCobroClienteDto):Promise<responseInterface>
    {
        // se crea un objeto con los nuevos valores
        const data = new this._cambioModel(body);

        await this._processData._saveDB(data).then(r =>
        {
            this._Response = r;
            
        }, err =>
        {
            this._Response = err;
            this._Response.data = null;
        }); 
        return this._Response;
    }

    //recibo el negocio y el formato de cobro para procesarlo
    private async treatmentCuotas(value:responseInterface, cobro:createCobroClienteDto):Promise<responseInterface>
    {
        let _Negocio:Negocio;
        let _Cobro:Cobros;
        let data:Cuota = null;
        let Response:responseInterface;

        //verifico si la respuesta de negocio tiene datos
        if(value.data == null){ return this._Response; }

        //manejo del negocio
        _Negocio = value.data;

        //manipulación de la cuota con cobro
        data = await new this._cuotaModel(this.addNewCuota(_Negocio, cobro));

        if (_Negocio.cuotas.length === 0) 
        {
            //sino tiene un carajo, se lo empujamos...
           _Negocio.cuotas.push(data);

           _Negocio = await this.refreshNegocioCliente(_Negocio);
           _Cobro = await this.saveNewCobro(cobro);

        }else
        {
            //si tiene se lo sobreescribimos...
           //_Negocio.cuotas.push(data);
           _Cobro = await this.saveNewCobro(cobro);
           _Negocio = await this.refreshNegocioCliente(_Negocio);
        }

        value.data = { negocio: _Negocio, cobro: _Cobro, cuota: data};

        return value;
    }

    private async saveNewCobro(cobro:createCobroClienteDto):Promise<Cobros>
    {
        let Response:Cobros;

        const data = new this._cobrosModel(cobro);

        await this._processData._saveDB(data).then(r => 
        {
            Response = r.data;
        }, 
        err => 
        {
            return err;
        }); 
        return Response; 
    }

    private async refreshNegocioCliente(negocio:Negocio):Promise<Negocio>
    {
        let Response:Negocio;
        negocio.updatedAt = this._dateProcessService.setDate();
        const args: _argsUpdate = {
            findObject: {
                _id: negocio._id,
            },
            set: {
                $set:negocio
            }
        }

        await this._processData._updateDB(this._negocioModel, args).then(r => 
        {
            Response = r.data;
        }, err => 
        {
            return err;
        });

        return Response;
    }

    //calculo de cuota simple
    private addNewCuota(negocio:Negocio, cobro:createCobroClienteDto)
    {
        this._Cuota.pagado             = cobro.monto;
        this._Cuota.restante           = negocio.total - cobro.monto;
        this._Cuota.penalizacion       = negocio.vcuotas - cobro.monto;
        this._Cuota.cuotas_restante    = negocio.ncuotas - 1;

        return this._Cuota;
    }

    //calculo de cuotas compuestas
    private addCompoundCuota(negocio:Negocio, cobro:createCobroCliente):Array<Cuota>
    {
        negocio.cuotas.forEach

        return 
    }

}
