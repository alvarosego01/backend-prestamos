import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index';
import { responseInterface, _argsFind, _argsPagination, _argsUpdate, _configPaginator, _dataPaginator } from 'src/Response/interfaces/interfaces.index';
import { ClienteDto } from '../models/dto/index.dto';
import { Cliente, ClienteSchema } from '../models/schemas/cliente.schema';

@Injectable()
export class ClienteService 
{
    private _Response:responseInterface;

    constructor
    (
        @InjectModel(Cliente.name) private clienteModel:Model<Cliente>,
        private _processData:ProcessDataService,
        private _dateProcessService:DateProcessService
    ){}

    async getAllClientes(cobrador:string):Promise<responseInterface>
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
            findObject: { cobrador_id: cobrador },
            options: parameters
        }

        await this._processData._findDB(this.clienteModel, args).then(r => 
        {
            this._Response = r;

        }, err => 
        {
            this._Response = err;
        });

        return this._Response;
    }

    async getOneCliente(cliente:string, cobrador:string):Promise<responseInterface>
    {

        const args: _argsFind = 
        {
            findObject: 
            {
                _id:cliente,
                cobrador_id:cobrador,
            },
            populate: null
            // select: "rol"
        }

        await this._processData._findOneDB(this.clienteModel, args).then(r => 
        {
            this._Response = r;
        }, err => 
        {
            this._Response = err;
        });

        return this._Response;
    }
    
    async createNewCliente(cliente:ClienteDto, cobrador:string):Promise<responseInterface>
    {
        const data = new this.clienteModel(cliente);
        //data.cobrador_id = cobrador;
        
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

    async delOneCliente(cliente:string):Promise<responseInterface>
    {
        await this._processData._deleteSoftDB(this.clienteModel, cliente).then(r => 
        {

            this._Response = r;

        }, err => 
        {
            this._Response = err;
        });

        return this._Response;
    }
}
