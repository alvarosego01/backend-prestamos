import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../models/schemas/userSchema";
// import { model } from "../models/schemas/userSchema";

// servicios de response handler y process data
import { responseInterface } from "src/Response/interfaces/interfaces.index";

import { ProcessDataService } from "src/Classes/classes.index";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private _processData: ProcessDataService
  ) {}

  pruebaRuta(ruta: string) {
    console.log("prueba de ruta", ruta);
    return `prueba de ruta ${ruta}`;



  }

  async pruebaGuardar(data: any): Promise<any> {
    const datarecibida = new this.UsersModel({
      name: data.name,
      pass: data.pass,
      email: '1aaa2a@gmail.com',
      ddd: "ssdfdf",
      _test: [{
        otro: "otro",
      },
      {
        otro: "otro",
      },
      {
        otro: "otro",
      }
    ],
    });
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

  async pruebaRecibir(datos) {
    console.log("prueba datos", datos);
    return;
  }
}

