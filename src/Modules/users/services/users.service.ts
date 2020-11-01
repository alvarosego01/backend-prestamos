import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../models/schemas/userSchema";
// import { model } from "../models/schemas/userSchema";

// servicios de response handler y process data
import { responseInterface, _argsFind } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

import { _configPaginator, _dataPaginator, _argsPagination, _argsUpdate} from 'src/Response/interfaces/interfaces.index';
import { UserDto, responseUserDTO } from "../models/dto/dto.index";

@Injectable()
export class UsersService
{

  _Response: responseInterface;

  constructor
  (
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private _processData: ProcessDataService,
    private _dateProcessService: DateProcessService

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
      // this._Response.message =
    });

    return this._Response;

  }



  async getOne(id: string): Promise<responseInterface> {

    const args: _argsFind = {
      findObject: {
        _id: id,
      },
      populate: null
      // select: "rol"
    }

    await this._processData._findOneDB(this.UsersModel, args).then(r => {
      this._Response = r;
    }, err => {
      this._Response = err;
    });

    return this._Response;
  }

  async saveUser(user:Users): Promise<responseInterface>
  {
    const data = new this.UsersModel(user);

    await this._processData._saveDB(data).then(r => {
      this._Response = r;
    }, err => {
      this._Response = null;
      this._Response.message = err;
    });

    return this._Response;
  }

  async updateUsers(user:UserDto, id:string): Promise<responseInterface>
  {
    // se crea un objeto con los nuevos valores
    const data: responseUserDTO = {
      name: user.name,
      last_name: user.last_name,
      status: user.status,
      id_card: user.id_card,
      pass: user.pass,
      email: user.email,
      updatedAt: this._dateProcessService.setDate(),
      _test: null
    }
    // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
    const args: _argsUpdate = {
      findObject: {
        _id: id,
      },
      set: {
        $set: data
      }
    }
    
    await this._processData._updateDB(this.UsersModel, args).then(r => 
    {
      this._Response = r;

    }, err => 
    {

      this._Response = err;
    });
    
    return this._Response;
  }

  async deleteUsers(id:string):Promise<responseInterface>
  {
    await this._processData._deleteSoftDB(this.UsersModel, id ).then(r  => {

      this._Response = r;
      this._Response.message = 'Usuario eliminado';

    }, err => {
      this._Response = err;
    });

    return this._Response;
  }

}

