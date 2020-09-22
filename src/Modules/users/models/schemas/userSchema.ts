import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import * as Mongoose from "mongoose";

import * as Moment from "moment-timezone";
const dateMoment = Moment().tz("America/Montevideo");

import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Roles } from "src/Modules/role/models/schemas/roleSchema";

// SCHMA DE EJEMPLO

@Schema()
class _test extends Document {
  @Prop({
    default: "otro",
  })
  otro: string;

  @Prop({
    default: "dato",
    required: false,
  })
  dato: string;
}
const _testSchema = SchemaFactory.createForClass(_test);

@Schema()
export class Users extends Document {
  @Prop({
    required: true,
    default: null,
  })
  name: string;
  @Prop({
    required: true,
    // default: null,
    unique: true,
  })
  email: string;

  @Prop({
    default: "culo",
    required: true,
  })
  pass: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: [true, "Debe establecer un rol"],
  })
  rol: string;
  //roles de usuario

  @Prop({ type: [_testSchema] })
  _test: _test;
}

export const UsersSchema = SchemaFactory.createForClass(Users)
  .plugin(uniqueValidator, {
    message: "El {PATH} {VALUE} ya está registrado en sistema",
  })
  .plugin(mongoosePaginate);

// // console.log("UsersSchema", UsersSchema);

// const roles = {
//     values: [
//         'ADMIN_ROLE',
//         'CONTRATISTA_ROLE',
//         'CANTANTE_ROLE',
//         'INSTRUMENTISTA_ROLE',
//         'ESCENADIRECTOR_ROLE',
//         'ORQUESTADIRECTOR_ROLE'
//     ],
//     response: 'El rol {VALUE} no esta permitido'
// }; //array de roles

// @Schema()
// class _social extends Document {
//   @Prop({
//       type: String,
//       required: false,
//       default: null,
//   })
//   name: string;

//   @Prop({
//       type: String,
//     default: null,
//     required: false,
//   })
//   url: string;
// }
// const _socialSchema = SchemaFactory.createForClass(_social);

// @Schema()
// class _socialNetwork extends Document {

//   @Prop({
//       type: String,
//       required: false,
//     default: null
//   })
//   youtube: string;

//   @Prop({
//       type: String,
//     default: null,
//     required: false,
//   })
//   website: string;

//   @Prop({ type: [_socialSchema] })
//   _social: _social;
// }
// const _socialNetworkSchema = SchemaFactory.createForClass(_socialNetwork);

// @Schema()
// export class Users extends Document {

//         @Prop({
//             type: Boolean,
//             required: true,
//             default: false
//         })
//         visible: boolean;
//         //valor de borrado lógico

//         @Prop({
//             type: String,
//             required: [true, 'Debe proporcionar un nombre']
//         })
//         name: string;
//         //nombre del usuario

//         @Prop({
//             type: String,
//             required: [true, 'Debe proporcionar un apellido']
//         })
//         lastName: string;
//         //apellido del usuario

//         @Prop({
//             type: String,
//             required: [true, 'Debe indicar el pais de origen']
//         })
//         originCountry: string;
//         //pais de origen

//         @Prop({
//             type: String,
//             required: [true, 'Debe indicar una nacionalidad']
//         })
//         citizenship: string;
//         //nacionalidad

//         @Prop({
//             type: String,
//             unique: [true, 'El nickname ya existe'],
//             required: [true, 'Debe proporcionar un nickname']
//         })
//         user: string;
//         //nickname del usuario

//         @Prop({
//             type: String,
//             required: [true, 'Debe proporcionar una contraseña']
//         })
//         pass: string;
//         //cntraseña del usuario

//         @Prop({
//             type: String,
//             unique: [true, 'El email ya se encuentra registrado'],
//             required: [true, 'Debe proporcionar un email']
//         })
//         email: string;
//         //correo del usuario

//         @Prop({
//             type: String,
//             required: [true, 'Debe proporcionar un numero de contato']
//         })
//         phone: string;
//         //correo del usuario

//         @Prop({
//             type: String,
//             required: false,
//             default: null
//         })
//         photo: string;
//         //photo del usuario
//         // _socialNetwork: _socialNetwork,
//         @Prop({ type: [_socialNetworkSchema] })
//         _socialNetwork: _socialNetwork;

//         @Prop({
//             type: Schema.Types.ObjectId,
//             ref: 'Category',
//             required: [true, 'Debe establecer un rol'],
//         })
//         role: string;
//         //roles de usuario

//         @Prop({
//             type: String,
//             default: null
//         })
//         created_at: string;
//         //fecha de creación del usuario

//         @Prop({
//             type: String,
//             default: null
//         })
//         updated_at: string;
//         //fecha de actualizacion de perfil del usuario

// }

// export const UsersSchema = SchemaFactory.createForClass(Users);
