import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateProcessService, ProcessDataService } from 'src/Classes/classes.index';
import { responseInterface, _argsFind, _argsPagination, _argsUpdate, _configPaginator, _dataPaginator } from 'src/Response/interfaces/interfaces.index';
import { RutaDto } from "../models/dto/dto.index";
import { Ruta } from '../models/schemas/ruta.schema';

@Injectable()
export class RutaService
{
    private _Response:responseInterface;

    constructor
    (
        @InjectModel(Ruta.name) private RutaModel:Model<Ruta>,
        private _processData:ProcessDataService,
        private _dateProcessService:DateProcessService
    ){}

    //necesito el id del enrutador
    async getAllRoutes(page, enrutador:string):Promise<responseInterface>
    {
        const parameters: _dataPaginator =
        {
            page: page || _configPaginator.page,
            limit: 12 || _configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: { _id: -1 },
            populate: {
                path: 'clientes_id',
                // select: '-pass'
              }

        }

        const args: _argsPagination =
        {
            findObject: { enrutador_id: enrutador },
            options: parameters
        }

        await this._processData._findDB(this.RutaModel, args).then((r: responseInterface) =>
        {
            this._Response = r;
            this._Response.message = 'Rutas encontradas'

        }, (err: responseInterface) =>
        {
            this._Response = err;
            this._Response.message = err.message || 'Algo ha salido mal, intente más tarde'

        });

        return this._Response;
    }

    //necesito el id del enrutador y el id de la ruta
    async getOneRoute(enrutador:string, ruta:string):Promise<responseInterface>
    {

        const args: _argsFind =
        {
            findObject:
            {
                _id:ruta,
                enrutador_id:enrutador,
            },
            // populate: "clientes_id"
            populate: {

                path: 'clientes_id',
                model: 'Cliente', // <- si es un array de ids se debe especificar el model
                populate: {

                    path: 'cobrador_id',
                    select: '-pass',
                    populate: {
                        path: 'rol',
                        select: 'rol alias',

                    }


                }

            }
            // populate: {

            //     path: '[clientes_id]',
            //     options: { retainNullValues: true }

            //   }
            // select: "rol"
        }

        await this._processData._findOneDB(this.RutaModel, args).then(r =>
        {
            this._Response = r;
        }, err =>
        {
            this._Response = err;
        });

        console.log(enrutador, ruta);
        return this._Response;
    }

    //necesito el formulario para añadir
    async createNewRoute(body:RutaDto):Promise<responseInterface>
    {
        const data = new this.RutaModel(body);

        await this._processData._saveDB(data).then((r: responseInterface) =>
        {
            this._Response = r;
            this._Response.message = 'Nueva ruta creada'
        },
        (err: responseInterface) =>
        {
            this._Response = err;
            this._Response.message = err.message || 'La ruta no pudo ser creada, intente más tarde';
        });

        return this._Response;
    }

    //necesito el id del enrutador y el id de la ruta para modificarla
    async modOneRoute(ruta:string, body:RutaDto):Promise<responseInterface>
    {
        const data:RutaDto =
        {
            ciudad: body.ciudad,
            departamento: body.departamento,
            enrutador_id: body.enrutador_id,
            updatedAt: this._dateProcessService.setDate()
        };

        const _args:_argsUpdate =
        {
            findObject: { _id:ruta },
            set: { $set:data }
        }

        await this._processData._updateDB(this.RutaModel, _args).then(r =>
        {
            this._Response = r;

        }, err =>
        {

            this._Response = err;
        });

        return this._Response;
    }

    //necesito el id del enrutador y el id de la ruta para eliminarla
    async delOneRoute(ruta:string):Promise<responseInterface>
    {
        await this._processData._deleteSoftDB(this.RutaModel, ruta).then(r =>
        {

            this._Response = r;

        }, err =>
        {
            this._Response = err;
        });

        return this._Response;
    }

}
