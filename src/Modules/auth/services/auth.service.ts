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
import { UserDto } from 'src/Modules/users/models/dto/user.dto';
import {PermisoService} from '../../permisos/services/permisos.service';


@Injectable()
export class AuthService {

  _Response: responseInterface;

  constructor(
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private readonly _jwtService: JwtService,
    private _processData: ProcessDataService,
    public _setUserMenu: SetUserMenuService,
    private _permisoService: PermisoService
  ) {}

  async signup(signupDto: SignupDto): Promise<responseInterface>
  {

    const { email, pass, name  } = signupDto;

    const user = new this.UsersModel(signupDto);
    // user.email = email;
    const salt = await genSalt(15);
    user.pass = await hash(pass, salt);

    await this._processData._saveDB(user).then((r: responseInterface) =>
    {
      this._Response = r;
      this._Response.message = 'Usuario registrado'
    }, (err: responseInterface) => {
      this._Response = err;

    });
    return this._Response;

  }

  async signup2(signupDto: SignupDto, params:string[]): Promise<responseInterface>
  {

    const { email, pass, name } = signupDto;

    const user        = new this.UsersModel(signupDto);
    const salt        = await genSalt(15);
    user.pass         = await hash(pass, salt);
    user.rol          = params['rol'];
    user.enrutator_id = params['ref'];

    await this._processData._saveDB(user).then((r: responseInterface) =>
    {
      this._Response = r;

    }, (err: responseInterface) =>
    {

      this._Response = err;

    });
    return this._Response;

  }
  
  async signin(signinDto: SigninDto): Promise<responseInterface>
  {
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
    await this._processData._findOneDB(this.UsersModel, args).then(async (r: responseInterface) =>
    {
      this._Response = r;

      if (!compareSync(pass, r.data.pass))
      {

        this._Response = {
          ok: false,
          status: 400,
          message: 'Contraseña incorrecta'
        };

      } else
      {

        const payload: IJwtPayload = {
          _id: r.data._id,
          email: r.data.email,
          rol: r.data.rol
        };
        const token = await this._jwtService.sign(payload);
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
          token: token,
          createdAt: r.data.createdAt,
          updatedAt: r.data.updatedAt
          // userMenu: this._setUserMenu.setMenu(r.data.rol.rol)

        }
        this._Response.data = l;

        this._Response.message = `Te damos la bienvenida, ${r.data.name}`;

      }

    }, (err: responseInterface) =>
    {
      this._Response = err;
      this._Response.message = (err.status != 500)?`Usuario o contraseña inválidos`: 'Algo ha salido mal, intente más tarde';
    })

    console.log('prueba', this._Response);


    return this._Response;

  }


}




