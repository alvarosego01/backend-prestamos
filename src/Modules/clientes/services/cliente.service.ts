import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index';
import {Ruta} from 'src/Modules/enrutador/models/schemas/ruta.schema';
import { responseInterface, _argsFind, _argsPagination, _argsUpdate, _configPaginator, _dataPaginator } from 'src/Response/interfaces/interfaces.index';
import { ClienteDto } from '../models/dto/dto.index';
import { Cliente, ClienteSchema } from '../models/schemas/cliente.schema';

@Injectable()
export class ClienteService
{
    private _Response:responseInterface;

    constructor
    (
        @InjectModel(Cliente.name) private clienteModel:Model<Cliente>,
        @InjectModel(Ruta.name) private RutaModel:Model<Ruta>,
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

    async setClientRoute(idRuta: string, idCliente: string){

        return new Promise(async (resolve,reject) => {



        const args: _argsFind =
        {
            findObject:
            {
                _id:idRuta,

            },
            populate: null
            // select: "rol"
        }

        await this._processData._findOneDB(this.RutaModel, args).then( async (r) =>
        {
            // this._Response = r;
            let clientes: any[] = r.data.clientes_id;

            clientes.push(idCliente);

            let data = {
                clientes_id: clientes
            }

            const args: _argsUpdate = {
                findObject: {
                  _id: idRuta,
                },
                set: {
                  $set: data
                },

              }

              await this._processData._updateDB(this.RutaModel, args).then( async (r: responseInterface) => {


                console.log('set actualizado cliente', r.data);

                resolve(true);

              }, err => {
                reject(false);
              })

        }, err =>
        {
            // this._Response = err;
            reject(false);
        });



        });

    }

    async createNewCliente(cliente:ClienteDto, idRuta: string):Promise<responseInterface>
    {
        const data = new this.clienteModel(cliente);
        //data.cobrador_id = cobrador;

        await this._processData._saveDB(data).then( async (r) =>
        {
            this._Response = r;

            await this.setClientRoute(idRuta, r.data._id).then(r => {

            }, err => {

            });

            this._Response.message = 'Nuevo cliente añadido';
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
