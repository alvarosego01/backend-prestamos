import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../models/schemas/userSchema";
// import { model } from "../models/schemas/userSchema";

// servicios de response handler y process data
import { responseInterface, _argsFind } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService, DateProcessService } from "src/Classes/classes.index";

import { _configPaginator, _dataPaginator, _argsPagination, _argsUpdate} from 'src/Response/interfaces/interfaces.index';
import { UserDto } from "../models/dto/dto.index";
import { updateProfileUserDTO, updateUserDto } from "../models/dto/user.dto";
import { sessionDTO } from "src/Modules/auth/dto";
import {SetUserMenuService} from "src/Modules/auth/services/authServices.index";

@Injectable()
export class UsersService
{

  _Response: responseInterface;

  constructor
  (

    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private _processData: ProcessDataService,
    private _dateProcessService: DateProcessService,
    public _setUserMenu: SetUserMenuService

  ){}


  async getAll(): Promise<responseInterface> {

    const parameters: _dataPaginator = { // <- paginate parameters

      page: 1 || _configPaginator.page,
      limit: 12 || _configPaginator.limit,
      customLabels: _configPaginator.customLabels,
      sort: { _id: -1 },
      populate: [
				{
					path: 'rol',
					select: 'alias'
				},
			],
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

  async updateUsers(user: updateUserDto, id:string): Promise<responseInterface>
  {

    const {

      name,
      last_name,
      id_card,
      pais,
      estado,
      ciudad,
      dir_domicilio,
      nro_movil,
      nro_fijo,
      edad,

    } = user;
    // se crea un objeto con los nuevos valores
    const data: updateProfileUserDTO = {
      name: name,
      last_name: last_name,
      id_card: id_card,
      pais: pais,
      estado: estado,
      ciudad: ciudad,
      dir_domicilio: dir_domicilio,
      nro_movil: nro_movil,
      nro_fijo: nro_fijo,
      edad: edad,
      updatedAt: this._dateProcessService.setDate(),
    }
    // se crea el objeto de argumentos con el id de busqueda en especifico y la data a reemplazar en set
    const args: _argsUpdate = {
      findObject: {
        _id: id,
      },
      set: {
        $set: data
      },
      populate: {
        path: 'rol',
        select: 'alias'
      }
    }

    await this._processData._updateDB(this.UsersModel, args).then( async r => {

      const l: sessionDTO = {
        _id: r.data._id,
        name: r.data.name,
        last_name: r.data.last_name,
        id_card: r.data.id_card,
        pais: r.data.pais,
        estado: r.data.estado,
        ciudad: r.data.ciudad,
        dir_domicilio: r.data.dir_domicilio,
        nro_movil: r.data.nro_movil,
        nro_fijo: r.data.nro_fijo,
        edad: r.data.edad,
        email: r.data.email,
        enrutator_id: r.data.enrutator_id,
        rol: r.data.rol.alias,
        rolName: r.data.rol.rol,
        token: null,
        createdAt: r.data.createdAt,
        updatedAt: r.data.updatedAt,
        // userMenu: this._setUserMenu.setMenu(r.data.rol.rol)

      }

      this._Response = r;
      this._Response.data = l;
      this._Response.message = 'Información actualizada';

      // this._Response.data.rol = 'CULOOO';
      // this._Response.data.rol = r.data.rol.alias;


    }, err => {
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

