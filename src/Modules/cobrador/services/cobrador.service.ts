import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DateProcessService, ProcessDataService} from 'src/Classes/classes.index';
import {Cliente} from 'src/Modules/clientes/models/schemas/cliente.schema';
import {Negocio} from 'src/Modules/clientes/models/schemas/negocio.schema';
// import {Cliente} from 'src/Modules/clientes/models/schemas/cliente.schema';
import {Ruta} from 'src/Modules/enrutador/models/schemas/ruta.schema';
import {Users} from 'src/Modules/users/models/schemas/userSchema';
import {responseInterface, _argsFind, _argsPagination, _argsUpdate, _configPaginator, _dataPaginator} from 'src/Response/interfaces/interfaces.index';
import {_argsPaginationAggregate} from 'src/Response/interfaces/responsePaginator.interface';


import * as Mongoose from "mongoose";

@Injectable()
export class CobradorService {
    private _Response: responseInterface;

    constructor
        (
            // @InjectModel(Cliente.name) private ClientesModel: Model<Cliente>,
            @InjectModel(Ruta.name) private RutaModel: Model<Ruta>,
            @InjectModel(Users.name) private UsersModel: Model<Users>,
            @InjectModel(Negocio.name) private NegocioModel:Model<Negocio>,
            private _processData: ProcessDataService,
            private _dateProcessService: DateProcessService
        ) { }


    async getCollectorsByEnrouter(page, id: string): Promise<responseInterface> {

        const parameters: _dataPaginator={ // <- paginate parameters

            page: page||_configPaginator.page,
            limit: 12||_configPaginator.limit,
            customLabels: _configPaginator.customLabels,
            sort: {_id: -1},
            populate: [
                {
                    path: 'rol',
                    select: 'rol alias'
                },
            ],
            select: '-pass'
        }

        const args: _argsPagination={

            findObject: {
                enrutator_id: id
            },
            options: parameters

        }

        await this._processData._findDB(this.UsersModel, args).then(async (r: responseInterface) => {
            this._Response=r;

            // console.log('la puta madre', r.data);

            // await this.setCollectorsAreas(r).then(rr => {
            //    this._Response.data = rr;
            //    this._Response.data = rr;

            // //    console.log('la mierda que se retorna', rr);
            // });

        }, (err: responseInterface) => {
            this._Response=err;
            // this._Response.message =
        });

        return this._Response;

    }


    // async getOneRoute(cobrador): Promise<responseInterface> {

    //     const args: _argsFind =
    //     {
    //         findObject:
    //         {
    //             _id:ruta,
    //             enrutador_id:enrutador,
    //         },
    //         // populate: "clientes_id"
    //         populate: {

    //             path: 'negocios_id',
    //             model: 'Negocio', // <- si es un array de ids se debe especificar el model
    //             populate: [
    //                 {
    //                     path: 'cliente_id',
    //                     model: 'Cliente',
    //                     select: "",
    //                 },
    //                 {
    //                     path: 'cobrador_id',
    //                     select: '-pass',
    //                     populate: {
    //                         path: 'rol',
    //                         select: 'rol alias',
    //                     }
    //                 }
    //             ]

    //         }

    //     }

    //     await this._processData._findOneDB(this.RutaModel, args).then(r =>
    //     {
    //         this._Response = r;
    //         console.log('r.data respuesta', r.data);
    //     }, err =>
    //     {
    //         this._Response = err;
    //     });

    //     console.log(enrutador, ruta);
    //     return this._Response;

    // }


    async getAllRoutes(page, cobradorId:string):Promise<responseInterface>
    {


        const args: _argsFind={
            findObject: {
                // cobrador_id: element._id,
            },
            // populate: null
             populate: {

                path: 'negocios_id',
                model: 'Negocio', // <- si es un array de ids se debe especificar el model
                populate: [

                            {
                                path: 'cliente_id',
                                model: 'Cliente',
                                select: ''

                            },
                            {
                                path: 'cobrador_id',
                                model: 'Users',
                                select: '-pass'

                            },


                ]

            }
            // select: "rol"
        }


        await this._processData._findAllDB(this.RutaModel, args).then(async (r: responseInterface) => {
            this._Response=r;

            let x = r.data;

        	let datos = await x.filter( (r) => {

                let dato = r;
                let pasa:boolean = false;

                r.negocios_id.forEach( (element, idx)  => {



                    if(String(element.cobrador_id._id) == String(cobradorId)){


                        console.log('iguales');
                        pasa = true;

                    }

                });

                if(pasa != false){


                    return r;

                }




            });

            console.log('datos', datos);

            this._Response.data = datos;


        }, (err: responseInterface) => {
            this._Response=err;
            // this._Response.message =
        });

        return this._Response;

        // const parameters: _dataPaginator =
        // {
        //     page: page || _configPaginator.page,
        //     limit: 12 || _configPaginator.limit,
        //     customLabels: _configPaginator.customLabels,
        //     sort: { _id: -1 },
        //     // populate: {

        //     //     path: 'negocios_id',
        //     //     model: 'Negocio', // <- si es un array de ids se debe especificar el model
        //     //     populate: [
        //     //         {
        //     //             path: 'cliente_id',
        //     //             model: 'Cliente',
        //     //             select: "",
        //     //         },
        //     //         // {
        //     //         //     path: 'cobrador_id',
        //     //         //     select: '-pass',
        //     //         //     populate: {
        //     //         //         path: 'rol',
        //     //         //         select: 'rol alias',
        //     //         //     }
        //     //         // }
        //     //     ]

        //     // }

        // }

        // const args: _argsPaginationAggregate =
        // {
        //     aggregate: [
        //         {
        //             $lookup:{
        //                 from: "negocios",
        //                 // localField : "negocios_id",
        //                 // foreignField : "_id",
        //                 let: {

        //                     "cobradorId": cobradorId,

        //                     "negocios_id": "$negocios_id"
        //                 },

        //                 pipeline: [

        //                     {
        //                         "$match": {
        //                         "$expr": {
        //                           "$and": [
        //                               { "$in": ["$_id", "$$negocios_id"] },
        //                             //   { "$eq": ["$ncuotas", 20 ] }
        //                           ]
        //                         }
        //                         }
        //                     }

        //                 ],

        //                 as : "negocios_id",
        //             },
        //         },
        //         // {
        //         //     $unwind:{
        //         //         preserveNullAndEmptyArrays : true, // this remove the object which is null
        //         //         path : "$negocios_id"
        //         //     }
        //         // },
        //         // {
        //         //     $match:{
        //         //         "$negocios_id": { "$in": [ cobradorId ] },
        //         //     }
        //         // },



        //     ],
        //     options: parameters
        // }

        // console.log('args aggregate', args);
        // console.log('id cobrador', cobradorId);



        // await this._processData._findDBAggregate(this.RutaModel, args).then((r: responseInterface) =>
        // {
        //     this._Response = r;
        //     this._Response.message = 'Rutas encontradas'

        // }, (err: responseInterface) =>
        // {


        //     this._Response = err;
        //     this._Response.message = err.message || 'Algo ha salido mal, intente más tarde'

        // });

        // return this._Response;
    }


    async setCollectorsAreas(collection: any , data: any[]) {


        return new Promise(async (resolve, reject) => {

            let x: any= data;
            await data.forEach(async (element, idx) => {


                const args: _argsFind={
                    findObject: {
                        cobrador_id: element._id,
                    },
                    populate: null
                    // select: "rol"
                }

                await this._processData._findAllDB(collection, args).then((r: responseInterface) => {

                    if (r.data!=null && r.data.length>0) {
                        x[idx]["clientesAsignados"].push({aaa: 'sss'});
                    }

                }, (err: responseInterface) => {

                });

            });

            resolve(x);

        });



        }


        async getOneRoute(cobrador:string, ruta:string):Promise<responseInterface>
        {

            const args: _argsFind =
            {
                findObject:
                {
                    _id:ruta,
                    // enrutador_id:enrutador,
                },
                // populate: "clientes_id"
                populate: [{

                    path: 'negocios_id',
                    model: 'Negocio', // <- si es un array de ids se debe especificar el model
                    populate: [
                        {
                            path: 'cliente_id',
                            model: 'Cliente',
                            select: "",
                        },
                        {
                            path: 'cobrador_id',
                            model: 'Users',
                            select: '-pass',
                            populate: {
                                path: 'rol',
                                select: 'rol alias',
                            }
                        }
                    ]

                },
                {
                    path: 'enrutador_id',
                    model: 'Users',
                    select: '-pass',
                    populate: {
                        path: 'rol',
                        select: 'rol alias',
                    }

                }
            ]

            }

            await this._processData._findOneDB(this.RutaModel, args).then(async (resp: responseInterface) =>
            {
                // console.log('r.data respuesta', r.data);

                this._Response = resp;


                // let x = new Promise((resolve, reject) => {

                    this._Response.data.negocios_id.forEach( (element,idx)  => {

                        if( String(element.cobrador_id._id) != String(cobrador) ){
                        console.log(' element._id ',element._id);
                        console.log(' cobrador); ',cobrador);


                            this._Response.data.negocios_id.splice(idx, 1);

                        }


                    });


                //     resolve(true);

                // })

                // await x.then( r => {

                // });


            }, err =>
            {
                this._Response = err;
            });

            // console.log(enrutador, ruta);
            return this._Response;
        }



}
