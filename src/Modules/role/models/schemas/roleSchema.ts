import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose } from "mongoose";



import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoosePaginate from "mongoose-paginate-v2";
import * as mongoose_delete from "mongoose-delete";

import { DateProcessService } from "src/Classes/classes.index";
import { artistSubRole, RoleType } from "../roletype.enum";



const rolesEnum = Object.values(RoleType);
const subRolesEnum = Object.values(artistSubRole);

const roles = {
    values: rolesEnum,
    message: 'El rol {VALUE} no esta permitido'
}; //array de roles

// const roles =
// {
//     values: ['ADMIN_ROLE', 'CLIENTE_ROLE', 'EMPRESA_ROLE'],
//     message: '{VALUE} no es un role permitido'
// }


const subRoles = {
    values: subRolesEnum,
    message: 'El sub rol {VALUE} no esta permitido'
}; //array de roles

const _dateService = new DateProcessService();

@Schema()
 class _subRole extends Document {

  @Prop({
    type: String,
    required: true,
    enum: subRoles,

  })
  rol: string;
  @Prop({
    type: String,
    default: '',
  })
  description: string;


  @Prop({
    type: String,
    required: true,
    unique: true,
    default: '',
  })
  alias: string;


  @Prop({
    // required: true,
    type: Array,
    default: _dateService.setDate()
  })
  createdAt: string;

  @Prop({
    type: String,
    default: null
  })
  updatedAt: string;



}
const _subRoleSchema = SchemaFactory.createForClass(_subRole);

@Schema()
export class Roles extends Document {


  @Prop({
    type: String,
    required: true,
    default: 'ARTIST_ROLE',
    enum: roles,
    unique: true,

  })
  rol: string;
  @Prop({
    type: String,
    required: false,
    default: '',
  })
  description: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    default: '',
  })
  alias: string;


  @Prop({ type: [_subRoleSchema] })
  _subRole: _subRole;

  @Prop({
    type: String,
    required: false,
    default: 'ACTIVE',
  })
  status: string;

  @Prop({
    // required: true,
    type: Array,
    default: _dateService.setDate()
  })
  createdAt: string;
  @Prop({
    // required: true,
    type: Array,
    default: null
  })
  updatedAt: string;

}

export const RolesSchema = SchemaFactory.createForClass(Roles)
.plugin(uniqueValidator, {
  message: "El {PATH} {VALUE} ya está registrado en sistema",
})
.plugin(mongoosePaginate)
.plugin(mongoose_delete, { overrideMethods: 'all' });



