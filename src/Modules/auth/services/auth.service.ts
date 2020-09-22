import {
  Injectable
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto, sessionDTO } from '../dto';


import { compare, compareSync } from 'bcryptjs';
import { IJwtPayload } from '../jwt-payload.interface';

// import { RoleType } from '../role/roletype.enum';


import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/Modules/users/models/schemas/userSchema';
import { Model } from "mongoose";

import { genSalt, hash } from 'bcryptjs';
import { responseInterface, _argsFind } from 'src/Response/interfaces/interfaces.index';
import { ProcessDataService } from 'src/Classes/classes.index';
import { SetUserMenuService } from './authServices.index';


@Injectable()
export class AuthService {

  _Response: responseInterface;

  constructor(
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private readonly _jwtService: JwtService,
    private _processData: ProcessDataService,
    private _setUserMenu: SetUserMenuService
  ) {}

  async signup(signupDto: SignupDto): Promise<responseInterface> {

    const { email, pass, name, rol } = signupDto;

    const user = new this.UsersModel(signupDto);
    // user.email = email;
    const salt = await genSalt(15);
    user.pass = await hash(pass, salt);

    await this._processData._saveDB(user).then((r: responseInterface) => {
      this._Response = r;
    }, (err: responseInterface) => {
      this._Response = err;
    });
    return this._Response;


  }

  async signin(signinDto: SigninDto): Promise<responseInterface> {
    const { email, pass } = signinDto;

    const args: _argsFind = {
      findObject: {
        email: email
      },
      populate: {
        path: 'rol',
        select: 'rol alias'
      },
      // select: "rol"
    }
    await this._processData._findOneDB( this.UsersModel, args ).then(async (r: responseInterface) => {
      this._Response = r;

      if(!compareSync(pass, r.data.pass)) {

        this._Response = {
          ok: false,
          status: 400,
          message: 'Contraseña incorrecta'
        };

      }else{

        const payload: IJwtPayload = {
          _id: r.data._id,
          email: r.data.email,
          rol: r.data.rol
        };
        const token = await this._jwtService.sign(payload);
        const l: sessionDTO = {
          _id: r.data._id,
          name: r.data.name,
          email: r.data.email,
          rol: r.data.rol.alias,
          token: token,
          userMenu: this._setUserMenu.setMenu(r.data.rol.rol)

        }
        this._Response.data = l;

      }

    }, (err: responseInterface) => {
      this._Response = err;
      this._Response.message = (err.status != 500)?`Usuario ${err.message}`: '';
    })


    return this._Response;

  }


}




