import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../models/schemas/userSchema";
// import { model } from "../models/schemas/userSchema";

// servicios de response handler y process data
import { responseInterface } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService } from "src/Classes/classes.index";

import { _configPaginator, _dataPaginator, _argsPagination} from 'src/Response/interfaces/interfaces.index';

@Injectable()
export class UsersService 
{

  constructor
  (
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private _processData: ProcessDataService,
    private _Response: responseInterface
    
  ){}

  
  async getAll(): Promise<responseInterface> {


    const parameters: _dataPaginator = { // <- paginate parameters

      page: 1 || _configPaginator.page,
      limit: 12 || _configPaginator.limit,
      customLabels: _configPaginator.customLabels,
      sort: { _id: -1 },

    }

    const args: _argsPagination = {

      findObject: {},
      options: parameters

    }

    await this._processData._findDB(this.UsersModel, args).then(r => {
      this._Response = r;
    }, err => {
      this._Response = err;
    });

    return this._Response;

  }

  async pruebaGuardar(data: any): Promise<any> 
  {
    const datarecibida = new this.UsersModel(data);
    console.log("datarecibida", datarecibida);
    let response = null;


    await this._processData._saveDB(datarecibida).then(
      (r: responseInterface) => {
        r.data.pass = "*";
        response = r;
      },
      (err: responseInterface) => {
        response = err;
      }
    );

    return response;
  }
  

}

