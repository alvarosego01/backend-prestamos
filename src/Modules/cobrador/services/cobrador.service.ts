import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {DateProcessService, ProcessDataService} from 'src/Classes/classes.index';
import {Cliente} from 'src/Modules/clientes/models/schemas/cliente.schema';
import {Ruta} from 'src/Modules/enrutador/models/schemas/ruta.schema';
import {Users} from 'src/Modules/users/models/schemas/userSchema';
import {responseInterface, _argsFind, _argsPagination, _argsUpdate, _configPaginator, _dataPaginator} from 'src/Response/interfaces/interfaces.index';

@Injectable()
export class CobradorService {
    private _Response: responseInterface;

    constructor
        (
            @InjectModel(Ruta.name) private RutaModel: Model<Ruta>,
            @InjectModel(Users.name) private UsersModel: Model<Users>,
            @InjectModel(Cliente.name) private ClientesModel: Model<Users>,
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

        await this._processData._findDB(this.UsersModel, args).then( async (r: responseInterface) => {
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


    async setCollectorsAreas(data: any[]) {


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
                x[idx]["clientesAsignados"]= [ 'AAA' ];

                console.log('la puta madre xxx', x[idx]["clientesAsignados"] );

                console.log('la puta madre 2', idx);
                await this._processData._findAllDB(this.ClientesModel, args).then((r: responseInterface) => {

                    if (r.data!=null && r.data.length>0) {
                        x[idx]["clientesAsignados"].push({aaa: 'sss'});
                    }

                }, (err: responseInterface) => {

                });

            });

            resolve(x);

        });



        }

}
