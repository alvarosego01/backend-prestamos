import { Injectable } from "@nestjs/common";

import { responseInterface, _argsFind, _argsPagination, _argsUpdate } from "src/Response/interfaces/interfaces.index";
import { DateProcessService } from "../classes.index";

@Injectable()
export class ProcessDataService {
  constructor(
    private _dateProcessService: DateProcessService
  ){

  }

  async _findDB(dataBody: any, parameters: _argsPagination = null): Promise<responseInterface> {

    return new Promise(async (resolve, reject) => {

    await dataBody.paginate(
      parameters.findObject,
			parameters.options,
			(error, response) => {

				if (error) {

          const resp: responseInterface = {
            ok: false,
            status: 500,
            message: 'Algo ha salido mal, intente más tarde',
            err: error,
          };
          reject(resp);

        }

        if(!response || response.paginator.itemCount == 0){

          const resp: responseInterface = {
            ok: false,
            status: 404,

          };
          reject(resp);

        }

        const resp: responseInterface = {
          ok: true,
          status: 200,
          data: response.itemsList,
          paginator: response.paginator
        };
        resolve(resp);

    	});

    });
  }

  async _findOneDB( dataBody: any, parameters: _argsFind ): Promise<responseInterface> {

    // console.log('llega al findone', parameters);
    return new Promise(async (resolve, reject) => {

      await dataBody.findOne(parameters.findObject)
      .populate(parameters.populate)
      .select(parameters.select)
      .exec((error, response) => {

        if(error){
          console.log('hubo error', error);
          const resp: responseInterface = {
            ok: false,
            status: 500,
            message: 'Algo ha salido mal, intente más tarde',
            err: error,
          };
          reject(resp);
        }

        if(!response || response.length == 0){
          console.log('inexistente');
          const resp: responseInterface = {
            ok: false,
            status: 404,
          };
          reject(resp);
        }
        console.log('todo exitoso');
          const resp: responseInterface = {
            ok: true,
            status: 200,
            data: response,
          };
          resolve(resp);


    });

    });
  }

  async _saveDB(dataBody: any): Promise<responseInterface> {
    return new Promise(async (resolve, reject) => {

      dataBody.save((err, response) => {
        if (err) {
          //if exists problem for update user, return sttus 400

          const resp: responseInterface = {
            ok: false,
            status: 400,
            err: err,

          };
          reject(resp);

        }

        const resp: responseInterface = {
          ok: true,
          status: 201,
          data: response,
        };
        resolve(resp);


      });


    });
  }

  async _updateDB(dataBody: any, parameters: _argsUpdate): Promise<responseInterface> {
    return new Promise(async (resolve, reject) => {

      await dataBody.findOneAndUpdate(
				parameters.findObject,
				parameters.set,
				{ new: true }, async (error, response) => {

					if (error) {
            console.log('hubo error', error);
            const resp: responseInterface = {
              ok: false,
              status: 500,
              message: 'Algo ha salido mal, intente más tarde',
              err: error,
            };
            reject(resp);
					}

					if (!response) {
					  const resp: responseInterface = {
              ok: true,
              status: 404,

              // data: r,
            };
            reject(resp);
					}
          const resp: responseInterface = {
            ok: true,
            status: 200,
            data: response
          };
          resolve(resp);

				});


    });
  }

  async _updateManyDB(dataBody: any, parameters: _argsUpdate): Promise<responseInterface> {
    return new Promise(async (resolve, reject) => {

      await dataBody.updateMany(
				parameters.findObject,
				parameters.set,
				{ new: true }, async (error, response) => {

					if (error) {
            console.log('hubo error', error);
            const resp: responseInterface = {
              ok: false,
              status: 500,
              message: 'Algo ha salido mal, intente más tarde',
              err: error,
            };
            reject(resp);
					}

					if (!response) {
					  const resp: responseInterface = {
              ok: true,
              status: 404,

              // data: r,
            };
            reject(resp);
					}
          const resp: responseInterface = {
            ok: true,
            status: 200,
            data: response,
          };
          resolve(resp);

				});


    });
  }

  async _deleteSoftDB(dataBody: any, id: string): Promise<responseInterface> {
    return new Promise(async (resolve, reject) => {


      await dataBody.findOneAndUpdate(
				{_id: id},
        { $set: {
          updatedAt: this._dateProcessService.setDate()
        }},
				{ new: true }, async (error, response) => {

          if (error) {
            console.log('hubo error', error);
            const resp: responseInterface = {
              ok: false,
              status: 500,
              message: 'Algo ha salido mal, intente más tarde',
              err: error,
            };
            reject(resp);
					}

					if (!response) {
					  const resp: responseInterface = {
              ok: true,
              status: 404,

            };
            reject(resp);
          }

          if(response){

            dataBody.delete({
              _id: id
            }).exec(function (error, response) {
              if (error) {
                console.log('hubo error', error);
                const resp: responseInterface = {
                  ok: false,
                  status: 500,
                  message: 'Algo ha salido mal, intente más tarde',
                  err: error,
                };
                reject(resp);
              }
              if (!response) {
                const resp: responseInterface = {
                  ok: true,
                  status: 400,

                };
                reject(resp);
              }

              const resp: responseInterface = {
                ok: true,
                status: 200,

              };
              resolve(resp);



             });

          }

        });



    });
  }



}
